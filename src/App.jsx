import AppLayout from "./components/AppLayout"
import Body from "./components/Body"
import { Route, Routes } from "react-router-dom"
import RestaurantMenu from "./components/RestaurantMenu"
import Error from "./components/Error"
function App() {


  return (
    <>
    <Routes>
      <Route path="/" element={<AppLayout/>}>
      <Route path="/" element={<Body/>}></Route>
      <Route path="/restaurantmenu/:id" element={<RestaurantMenu/>}></Route>
      </Route>
    </Routes>
    </>
  )
}

export default App
