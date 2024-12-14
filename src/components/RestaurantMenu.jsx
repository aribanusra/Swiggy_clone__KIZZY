import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Restaurantmenucard from "./restaurantmenucard";
import Restaurantmenugrid from "./RestaurantmenuAccordion";
import RestaurantmenuDeals from "./RestaurantmenuDeals";
import RestaurantmenuAccordion from "./RestaurantmenuAccordion";

const RestaurantMenu = () => {
  const { id } = useParams();
  const [resInfo, setResInfo] = useState([]);
  const [datarestro5, setdata] = useState([]);
  const [cardData2, setcardData] = useState([]);
  const [heading1, setheading] = useState([]);
  const [offer3, setoffer] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const json = await fetch(
      `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=26.474598&lng=80.332228&restaurantId=${id
        .split("t")
        .at(-1)}&submitAction=ENTER`
    );
    const res = await json.json();
    let griddata =
      res?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
    const gridfiltereddata = griddata.filter((data) =>
      data?.card?.card["@type"].includes("ItemCategory")
    );

    setheading(res?.data?.cards[0]?.card?.card?.text);
    setcardData(res?.data?.cards[2]?.card?.card.info);
    setoffer(
      res?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
    );
    setdata(gridfiltereddata);
    const resInfo = res?.data?.cards.find((data) =>
      data?.card?.card?.["@type"].includes("food.v2.Restaurant")
  )?.card?.card?.info;
  setResInfo(resInfo)

  };

  return (
    <>
      <div className="w-full">
        <div className="w-[95%] xl:w-1/2 mx-auto pt-8">
          <p className="text-[0.7rem] hover:cursor-pointer text-gray-700 hover:text-black">
            <Link to={"/"}>Home </Link>/ <Link to={"/"}>{cardData2.city}</Link>{" "}
            / {cardData2.name}
          </p>
          <div className="text-2xl font-extrabold text-gray-900 py-7">
            {heading1}
          </div>
     { cardData2 &&    <Restaurantmenucard info={cardData2} />}

       {  offer3 && <RestaurantmenuDeals info={offer3} />}
          <div>
            
            {datarestro5.map(({ card : { card} }, i) => (
              <RestaurantmenuAccordion props={card} key={i} /> //card contains all 15 card detructured and resinfo has 
            ))}
          </div>
        
        </div>
      </div>
    </>
  );
};

export default RestaurantMenu;
