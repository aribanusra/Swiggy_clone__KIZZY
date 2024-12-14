import React, { useEffect, useState } from "react";
import OnYourMind from "./Onyourmind";
import RestaurantCard from "./RestaurantCard";
import TopRestaurant from "./Toprestaurant";

const Body = () => {
  const [onYourMind, setonYourMind] = useState([]);
  const [topResturant, setTopResturant] = useState([]);

  const [ResultData, setResultData] = useState([]);

  const [TopResTitle, setTopResTitle] = useState("");
  const [OnlineTitle, setOnlineTitle] = useState("");




  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const json = await fetch(
      "https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/list/v5?lat=18.9690247&lng=72.8205292&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const data = await json.json();
    
console.log(data);


    setonYourMind(data?.data?.cards[0]?.card?.card?.imageGridCards?.info);

    setTopResturant(
      data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setTopResTitle(data?.data?.cards[1]?.card?.card?.header?.title);


    setResultData(
      data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setOnlineTitle(data?.data?.cards[2]?.card?.card?.title);
   

  };

  return (
    <>
      <div className="w-[90%] xl:w-[80%] mt-3 mx-auto overflow-hidden">
       { onYourMind && <OnYourMind Data={onYourMind} />}
        { topResturant && <TopRestaurant Data={topResturant} title={TopResTitle} /> }
         <div className="mt-10  w-full">
      <p className="font-bold text-2xl">{OnlineTitle}</p>
  </div>
         <div className="flex flex-wrap gap-8 mt-10">
        {ResultData &&
          ResultData.map(({info , cta}) => (
        
            <RestaurantCard key={info.id} data={info}   link={cta.link} />
          ))} 
          </div>
      </div>
    </>
  );
};

export default Body;
