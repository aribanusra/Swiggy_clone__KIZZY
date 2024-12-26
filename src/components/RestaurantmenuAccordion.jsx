import React, { useState } from "react";
import RestaurantMenugridlist from "./RestaurantMenugridlist";

const RestaurantmenuAccordion = ({ props ,resinfo }) => {

  let iscategory = false;
  if (props["@type"])
    iscategory = true

  const [accordion, setaccordion] = useState(iscategory);



  function toggle() {
  setaccordion(!accordion)
  }

  if (props.itemCards) {
    const { title, itemCards } = props;

    // as there two categories : itemcard and categories so first return itemcard data
    return (
      <>
      <div className="mt-7">
        <div className="flex justify-between font-bold" onClick={toggle}>
          <h1 className={"font-semibold sm:font-bold text-" + (props["@type"] ? "xl" : "base")}>
            {title} ( {itemCards?.length})
          </h1>
          <i className="fi fi-rr-angle-small-down"></i>
        </div>
        {accordion && <RestaurantMenugridlist props={itemCards}  resinfo={resinfo}/>}
         </div>
        <hr className={" my-5 border-"+(props["@type"] ? "4" : "[10px]")} />
       
      </>
    );
  } else {
    const { title, categories } = props;
    return (
      <>
        <h1 className="font-bold text-xl">{title}</h1>
        {/* //dont use curly braces map is a function and we do recursion as same data consiss of itemcards */}
        {categories.map((item, i) => (

          <div key={i}>
            <RestaurantmenuAccordion props={item}  />
          </div>
        )
        )}
      </>
    );
  }
};

export default RestaurantmenuAccordion;
