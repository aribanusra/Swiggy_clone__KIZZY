
import Body from "./components/Body"
import { Route, Routes } from "react-router-dom"
import RestaurantMenu from "./components/RestaurantMenu"
import Header from "./components/Header"
import Cartdata from "./components/Cartdata"
import { useSelector } from "react-redux"
import Searchtab from "./components/Searchtab"


function App() {

  const visible = useSelector((state) => state.ToggleSlice.searchbartoggle)

  return (
    <>
      <div className={"p-0 " + (visible ? "overflow-hidden max-h-screen" : " ")}>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="/" element={<Body />}></Route>
            <Route path="/restaurantmenu/:id" element={<RestaurantMenu />}></Route>
            <Route path="/cart" element={<Cartdata />}></Route>
            <Route path="/search" element={<Searchtab />}></Route>
            <Route path="*" element={<h1>page not found</h1>}></Route>
          </Route>
        </Routes>
      </div>


    </>
  )
}

export default App
