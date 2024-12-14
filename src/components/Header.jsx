import React from "react";

import kz from "../assets/kz.png";
import { Link } from "react-router-dom";
const Header = () => {
  const nav = [
    {
      img: " fi-rs-search",
      name: "Search",
    },
    {
      img: " fi-rr-badge-percent",
      name: "Offers",
    },
    {
      img: "fi-rs-user",
      name: "User",
    },
    {
      img: " fi-rr-shopping-cart-add",
      name: "Cart",
    },
  ];
  return (
    <div className="w-full shadow-md h-20 ">
      <div className="flex  items-center w-full justify-between  px-24  ">
        <div className="flex  items-center  ">
          <Link to="/">
            <img className="w-20" src={kz} alt="logo" />
          </Link>

          <p className="font-bold border-b-2 border-black">others</p>
          <i className="fi fi-rr-angle-small-down  m-2 mt-4"></i>
        </div>
        <div className="flex  items-center gap-28">
          {nav.map((item, i) => (
            <div
              key={i}
              className="flex text-gray-700 font-semibold  items-center gap-2"
            >
              <div>{item.name}</div>
              <div>
                {" "}
                <i className={" mt-1 fi " + item.img}></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
