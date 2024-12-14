import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
const RestaurantmenuDeals = ({ info }) => {


  const [Value, setValue] = useState(0);
  function handleNext(){
      Value >=160 ? "" : setValue((Prev)=>Prev + 20 )
  }
  function handlePrev(){
     Value <=0 ? "" : setValue((Prev)=>Prev - 20 )
  }


  return (
    <>
      <div className="w-full  overflow-hidden">
        <div className="flex justify-between mt-8">
          <p className="font-bold text-xl">Deals For You</p>
          <div className="flex gap-3">
          <div onClick={handlePrev} className='cursor-pointer bg-gray-200 rounded-full w-9 h-9 flex justify-center items-center'>
                    <i className="fi text-2xl mt-1 fi-rr-arrow-small-left"></i>
                </div>
                <div onClick={handleNext} className='cursor-pointer bg-gray-200 rounded-full w-9 h-9 flex justify-center items-center'>
                    <i className="fi text-2xl mt-1 fi-rr-arrow-small-right"></i>
                </div>
          </div>
        </div>
        <div style={{translate: `-${Value}%`}}>
          <div className="flex gap-4 mt-5  duration-300">
            {info.map((data, i) => (
              <Discount key={i} data={data} />
              
            ))}
          </div>
        </div>
      </div>
      <div>
      </div>
      <div className="flex items-center"></div>
      <h2 className="text-center mt-10 font-bold">MENU</h2>
    <div className="w-full mt-6 relative cursor-pointer">
      <Link to={"/search"}>
      <div className="w-full p-3 rounded-xl font-semibold text-lg bg-[#f2f2f2] text-center">Search For Dishes ?</div>
      <i className="fi fi-rr-search absolute top-3 right-4 text-xl"></i>
      </Link>
    </div>

    </>
  );
};


function Discount({
  data: {
    info: { header, offerLogo, couponCode },
  },
}) {
  // console.log(offerLogo)
  return (
    <div className="flex gap-6 min-w-[328px] h-[76px] p-3 border rounded-2xl">
      <img
        src={
          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/" +
          offerLogo
        }
        alt=""
      />
      <div>
        <h2 className="font-bold text-xl">{header}</h2>
        <p className="text-gray-500">{couponCode}</p>
      </div>
    </div>
  );
}
export default RestaurantmenuDeals;
