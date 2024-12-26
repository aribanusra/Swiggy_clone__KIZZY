import React, { useEffect, useState } from 'react'

import { Link } from "react-router-dom";
import RestaurantCard from './RestaurantCard';

function TopRestaurant({ Data=[], title }) {
  
  const [Value, setValue] = useState(0);
  function handleNext() {
    setValue((prev) => prev + 40);
  }
  function handlePrev() {
    setValue((prev) => prev - 40);
  }


  return (
    Data && (
      <div className="mt-10  w-full">
        <div className="flex justify-between mt-5">
          <p className="font-bold text-xl md:text-2xl">{title}</p>
          <div className="flex gap-3">
            <div
              onClick={handlePrev}
              className="cursor-pointer bg-gray-200 rounded-full  w-7 md:w-9 h-7 md:h-9  flex justify-center items-center"
            >
              <i className="fi text-2xl mt-1 fi-rr-arrow-small-left"></i>
            </div>
            <div
              onClick={handleNext}
              className="cursor-pointer bg-gray-200 rounded-full  w-7 md:w-9 h-7 md:h-9  flex justify-center items-center"
            >
              <i className="fi text-2xl mt-1 fi-rr-arrow-small-right"></i>
            </div>
          </div>
        </div>
        <div
          className={`flex mt-4 gap-5  w-full duration-300`}
          style={{ translate: `-${Value}%` }}
        >
          {Data && Data.map(({info , cta : {link}}) => (
              <div key={info.id} className="hover:scale-95 duration-200">
                <RestaurantCard data={info} link={link} />
              
              </div>
            ))}
        </div>

        <hr className="border mt-5" />
      </div>
    )
  );
}

export default TopRestaurant;
