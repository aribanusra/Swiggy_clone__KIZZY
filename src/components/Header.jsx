import React, { useContext, useState } from "react";

import kz from "../assets/kz.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogin, togglesearchbar } from '../utils/togglesclice';
import { changecoord } from '../utils/Coordinateslice'
import SigninBtn from "./Signin";
const Header = () => {


  const [searchdata, setsearchdata] = useState([])
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cartSlice.cart)
  const userData = useSelector((state) => state.authSlice.userData);
  const visible = useSelector((state) => state.ToggleSlice.searchbartoggle)
  const loginVisible = useSelector((state) => state.ToggleSlice.loginToggle);


  const dispatch = useDispatch()

  async function searchResultFun(e) { //It takes the place api and when typed on input box searches and displays searched location on the basis of the search 
    if (!e.trim()) return;
    const json = await fetch(`https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/misc/place-autocomplete?input=${e}`)
    const data = await json.json()
    setsearchdata(data.data)
  }
  const visibility = () => {
    dispatch(togglesearchbar())
  }
  function handleLogin() {
    dispatch(toggleLogin());
  }

  async function fetchLatAndLng(id) {   // this function is used to searc restaurant
    if (id == "") return;
    const res = await fetch(`https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/misc/address-recommend?place_id=${id}`);
    const data = await res.json();
    let lat = data.data[0].geometry.location.lat;
    let lng = data.data[0].geometry.location.lng;
    dispatch(changecoord({ lat, lng }))
    navigate("/");
    visibility()
    setAddress(data.data[0].formatted_address);

  }




  const nav = [
    {
      img: " fi-rs-search",
      name: "Search",
      path: "/search"
    },
    {
      img: "fi-rs-user",
      name: "Sign in",
      path: "/signin"
    },
    {
      img: " fi-rr-shopping-cart-add",
      name: "Cart",
      path: "/cart"
    },
  ];





  return (
    <>
      <div className="w-full ">
        <div className={"w-full  h-full z-10 bg-black/50 absolute " + (visible ? "visible " : "invisible ")} onClick={visibility}></div>
        <div className={"bg-white h-full z-20 w-full md:w-2/5 absolute pl-24 duration-700 py-10 " + (visible ? "left-0" : "left-[-100%]")}>
          <div className="  flex flex-col gap-7 lg-[50%] mt-20 mr-14">
            <i className="fi fi-br-cross" onClick={visibility} ></i>
            <input type="text" className="border font-semibold p-3 md:p-4 focus:outline-none focus:drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)]"
              placeholder=" Search for area, Street name.." onChange={(e) => searchResultFun(e.target.value)} />

            <ul className="border p-5">
              {searchdata.map((place, i) => (
                <div key={i}>
                  <div className="cursor-pointer group border-b-2 border-dashed pb-3 my-5 flex gap-4 "  >
                    <i className="fi mt-1 fi-rr-marker"></i>
                    <li onClick={() => fetchLatAndLng(place.place_id)} >
                      <p className="group-hover:text-orange-500" >{place?.structured_formatting?.main_text}</p>
                      <p className="text-sm opacity-65">{place?.structured_formatting?.secondary_text}</p></li>

                  </div>
                </div>
              ))}    </ul>

          </div>
        </div>

      </div>



      <div className="w-full">
        <div onClick={handleLogin} className={"w-full bg-black/50 z-30 h-full absolute " + (loginVisible ? "visible " : " invisible")} ></div>
        <div className={" bg-white flex   w-full md:w-[40%] h-full p-5 z-40 fixed duration-500 " +
          (loginVisible ? "right-0" : "-right-[100%]")}      >
          <div className=" m-3 w-full lg:w-[60%] ">
            <i className="fi fi-br-cross" onClick={handleLogin}></i>
            <div className="my-10 w-full flex justify-between items-center">
              <h2 className="font-bold text-4xl border-b-2 border-black pb-5 ">  Sign in </h2>
              <img className="w-28" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
                alt="" />
            </div>

            <SigninBtn />
            <p className="text-base mt-2 opacity-70">
              By clicking on Login, I accept the Terms &
              Conditions & Privacy Policy
            </p>
          </div>
        </div>
      </div>





      <div className="z-40 bg-white sticky top-0 w-full shadow-md h-20 ">
        <div className="flex  items-center w-full justify-between px-4 lg:px-24  ">
          <div className="flex  items-center  ">
            <Link to="/">
              <div className="w-20">
                <img src={kz} alt="logo" />
              </div>
            </Link>
            <div className="flex  items-center  ">
              <p className="font-bold border-b-2 border-black" onClick={visibility} >others</p>
              <p className="ml-2 max-w-[250px] text-sm opacity-85 line-clamp-1">{address}</p>
              <i className="fi fi-rr-angle-small-down  m-2 mt-4" onClick={visibility}></i>
            </div>
          </div>
          <div className="sm:flex hidden sm:visible items-center gap-5 md:gap-20">
            {nav.map((data, i) =>
              data.name == "Sign in" ? (

                <div onClick={handleLogin} key={data.path}>
                  <div className="flex items-center gap-3" key={i} >
                    <i className={"mt-1 fi text-sm sm:text-xl text-gray-700 " + data.img}  ></i>
                    <p className="text-sm sm:text-lg font-medium text-gray-700 line-clamp-1">  {userData ? userData.name : data.name}  </p>
                    {data.name == "Cart" && cart.length > 0 && (<sup className="">  {cart.length}  </sup>)}
                    {userData && <div className="text-orange-500 text-sm">(Log Out)</div>}
                  </div>
                </div>

              ) : (
                <Link to={data.path} key={data.path}>
                  <div className="flex text-gray-700 font-semibold  items-center gap-2" >
                    <div>
                      {" "}
                      <i className={"mt-1 fi  text-sm sm:text-xl text-gray-700 " + data.img}  ></i>
                    </div>
                    <div className="text-sm sm:text-lg">{data.name}</div>
                    {data.name == "Cart" && cart.length > 0 && (<sup className="">  {cart.length}  </sup>)}
                  </div>
                </Link>
              )
            )}
          </div>
          <div className="flex visible sm:hidden items-center gap-5 md:gap-20">
            {nav.map((data, i) =>
               data.name == "Sign in" ? (

                <div onClick={handleLogin} key={data.path}>
                  <div className="flex items-center gap-3" key={i} >
                    <i className={"mt-1 fi text-base sm:text-xl text-gray-700 " + data.img}  ></i>
                    <p className="text-sm sm:text-lg font-medium text-gray-700 line-clamp-1">  {userData ? userData.name : ""}  </p>
                    {data.name == "Cart" && cart.length > 0 && (<sup className="">  {cart.length}  </sup>)}
                    {userData && <div className="text-orange-500 text-sm hidden sm:visible">(Log Out)</div>}
                  </div>
                </div>

              ) : (
              <Link to={data.path} key={data.path}>
               <p className="flex">
               <i className={"mt-1 fi text-base text-gray-700 " + data.img}  ></i>
               <span>  {data.name == "Cart" && cart.length > 0 && (<sup className="">  {cart.length}  </sup>)}</span>
               </p>
                 
              </Link>
            )
            )}
          </div>
        </div>
      </div>

      <Outlet />

      <Footer />
    </>
  );
};

export default Header;
