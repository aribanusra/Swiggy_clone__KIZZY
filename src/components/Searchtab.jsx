import React, { useEffect, useState } from "react";

import {  useSelector } from "react-redux";
import SearchDishes from "./SearchDishes";
import SearcRestaurant from "./SearcRestaurant";


function Searchtab() {
    const lat = useSelector((state) => state.Coordinateslice.lat)
    const lng = useSelector((state) => state.Coordinateslice.lng)
    const [searchQuery, setSearchQuery] = useState("");
    const [dishes, setDishes] = useState([]);
    const [restaurantData, setRestaurantData] = useState([]);
    const [activeBtn, setActiveBtn] = useState("Dishes");

    const filterOptions = ["Restaurant", "Dishes"];
    function handleFilterBtn(filterName) {
        setActiveBtn(activeBtn === filterName ? activeBtn : filterName);
    }

    function handleSearchQuery(e) {
        let val = e.target.value;
        if (e.keyCode == 13) {
            setSearchQuery(val);
          
        }
    }

    async function fetchDishes() {
        let data = await fetch(
            `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=4836a39e-ca12-654d-dc3b-2af9d645f8d7&submitAction=ENTER&queryUniqueId=7abdce29-5ac6-7673-9156-3022b0e032f0`
        );
        let res = await data.json();

        let finalData = (res?.data?.cards.find(data => data?.groupedCard).groupedCard?.cardGroupMap?.DISH?.cards).filter(
            (data) => data?.card?.card?.["@type"].includes("food.v2.Dish")
        );
        console.log(finalData)
        setDishes(finalData);
    }

    async function fetchResaturantData() {
        let data = await fetch(
            `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=4836a39e-ca12-654d-dc3b-2af9d645f8d7&submitAction=ENTER&queryUniqueId=7abdce29-5ac6-7673-9156-3022b0e032f0&selectedPLTab=RESTAURANT`
        );
        let res = await data.json();
        const finalData = (res?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards).filter(
            (data) => data?.card?.card?.info
        );
        setRestaurantData(finalData);
    }

    useEffect(() => {
        if (searchQuery === "") {
            return;
        }
        fetchDishes();
        fetchResaturantData();
    }, [searchQuery]);

    return (
        <div className="flex-col flex  items-center w-full h-[100vh] mt-10 md:w-[800px] mx-auto">
            <div className="lg:w-full w-[85%] md:w-[70%] mx-auto relative">
                <i className="fi fi-rr-angle-small-left text-2xl ml-2 mt-1 absolute top-1/2 -translate-y-1/2"></i>
                <i className="fi fi-rr-search absolute top-1/2 right-0 -translate-y-1/2 mr-5"></i>
                <input
                    // onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchQuery}
                    className="border-2 w-full pl-8 py-3 text-sm md:text-xl focus:outline-none"
                    type="text"
                    placeholder="Search for restaurant and food"
                />
            </div>






            <div className="my-5 md:my-7 flex flex-wrap gap-3">
                {filterOptions.map((filterName, i) => (
                    <button key={i} onClick={() => handleFilterBtn(filterName)}
                        className={"filterBtn flex gap-2 " + (activeBtn === filterName ? "active" : "")} >
                        <p className="text-sm md:text-xl">{filterName}</p>
                    </button>
                ))}
            </div>







            <div className="w-full md:w-[800px] mt-5  grid grid-cols-1 md:grid-cols-2   bg-[#f4f5f7]">
                {activeBtn === "Dishes" ? 
                (
                    dishes.map((data, i) => <SearchDishes key={i} data={data.card.card} />)
                ) : (
                    restaurantData.map((data, i) =>  <SearcRestaurant data={data} key={i} /> )
                )
                }
            </div>
        </div>
    );
}

export default Searchtab;

//https://www.swiggy.com/dapi/restaurants/search/v3?lat=18.9690247&lng=72.8205292&str=pizza&trackingId=undefined&submitAction=ENTER&selectedPLTab=dish-add&restaurantMenuUrl=%2Fcity%2Fmumbai%2Ffrancescos-pizzeria-chowpatty-rest14751%3Fquery%3Dpizza&restaurantIdOfAddedItem=14751&itemAdded=78361058
//https://www.swiggy.com/dapi/restaurants/search/v3?lat=18.9690247&lng=72.8205292&str=&trackingId=null&submitAction=ENTER&selectedPLTab=dish-add&restaurantMenuUrl=%2Fcity%2Fmumbai%2Ffrancescos-pizzeria-kemps-corner-mahalaxmi-malabar-hill-rest14751%3Fquery%3D&restaurantIdOfAddedItem=14751&itemAdded=78361058
