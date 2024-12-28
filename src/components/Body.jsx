import React, { useContext, useEffect, useState } from "react";
import OnYourMind from "./Onyourmind";
import RestaurantCard from "./RestaurantCard";
import TopRestaurant from "./Toprestaurant";
import { useSelector, useDispatch } from "react-redux";
import { setFilterValue } from "../utils/filterSlice";
import Shimmerbody from "./Shimmerbody";


const Body = () => {
  const [onYourMind, setonYourMind] = useState([]);
  const [topResturant, setTopResturant] = useState([]);
  const [ResultData, setResultData] = useState([]);
  const [TopResTitle, setTopResTitle] = useState("");
  const [OnlineTitle, setOnlineTitle] = useState("");
  const [datad, setdata] = useState("")
  const lat = useSelector((state) => state.Coordinateslice.lat)
  const lng = useSelector((state) => state.Coordinateslice.lng)





  useEffect(() => {
    fetchData();

  }, [lat, lng]); // 

  const fetchData = async () => {
    const json = await fetch(
      `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}0&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );
    const result = await json.json();
  
    let oym = result?.data?.cards.find((data) => data?.card?.card?.id == "whats_on_your_mind"
    );
    setonYourMind(oym?.card?.card?.imageGridCards?.info);

    let toprestaurant = result?.data?.cards.find((data) => data?.card?.card?.id == "top_brands_for_you")
    let topresdata = toprestaurant?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    let toprestitle = toprestaurant?.card?.card?.header?.title


    let allrestaurant = result?.data?.cards.find((data) => data?.card?.card?.id == "restaurant_grid_listing")
    let allresdata = allrestaurant?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    let allrestitle = result?.data?.cards.find((data) => data?.card?.card?.id == "popular_restaurants_title").card?.card?.title


    setTopResturant(topresdata || allresdata);
    setTopResTitle(toprestitle);
    setResultData(allresdata)
    setOnlineTitle(allrestitle);
    setdata(result?.data?.cards[0]?.card?.card)
  };











  const filterVal = useSelector((state) => state.filterSlice.filterVal)
  const filteredData = ResultData.filter((item) => {
    if (!filterVal) return true;

    switch (filterVal) {
      case "Ratings 4.0+":
        return item?.info?.avgRating > 4;
      case "Rs. 300-Rs. 600":
        return (
          item?.info?.costForTwo?.slice(1, 4) >= "300" &&
          item?.info?.costForTwo?.slice(1, 4) <= "600"
        );
      case "Offers":
        return !!item?.info?.aggregatedDiscountInfoV3;

      case "Less than Rs. 300":
        return item?.info?.costForTwo?.slice(1, 4) < "300";
      default:
        return true;
    }
  });

  const filterOptions = ["Ratings 4.0+", "Rs. 300-Rs. 600", "Offers", "Less than Rs. 300",]
  const [activeBtn, setActiveBtn] = useState(null)
  const dispatch = useDispatch()
  function handleFilterBtn(filterName) {
    setActiveBtn(activeBtn === filterName ? null : filterName)
  }
  dispatch(setFilterValue(activeBtn))
  const finaldata = filterVal ? filteredData : ResultData







  if (datad.id === "swiggy_not_present") {
    return (
      <div className="flex mt-40 overflow-hidden justify-center items-center flex-col">
        <img
          className="w-72"
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png"
          alt=""
        />
        <h1 className="text-lg text-orange-600 ">{datad.title}</h1>
      </div>
    );
  }

  else {
    return (
      <>
        {ResultData.length
          ?

          <div className="w-[95%] md:w-[75%] xl:w-[80%] mt-3 mx-auto overflow-hidden">
            {onYourMind &&
              <>
                {onYourMind && <OnYourMind Data={onYourMind} />}
                {topResturant && <TopRestaurant Data={topResturant} title={TopResTitle} />}
              </>
            }




            <div className="mt-10  w-full">
              <p className="font-bold text-xl md:text-2xl">{OnlineTitle}</p>
            </div>




            <div className="my-7 flex flex-wrap gap-3">
              {
                filterOptions.map((filterName, i) => (
                  <button key={i}
                    onClick={() => handleFilterBtn(filterName)}
                    className={"mobilefilter md:filterBtn flex gap-2 " + (activeBtn === filterName ? "active" : "")}>
                    <p className="text-sm md:text-xl">{filterName}</p>
                    <i className="fi text-sm mt-1 fi-br-cross hidden"></i>
                  </button>
                ))
              }
            </div>



            <div className="flex flex-wrap gap-10 justify-center mt-10">
              {finaldata &&
                finaldata.map(({ info, cta }) => (

                  <RestaurantCard key={info.id} data={info} link={cta.link} />
                ))}
            </div>



          </div>

          :
        <Shimmerbody/>
        }
      </>
    );
  }


};

export default Body;
