import React from "react";
import { ItemCategory } from "../ItemCategory/ItemCategory.js";

//stateless function component (sfc)
export const Categories = ({categories}) => {  
  // console.log("categories in categories.js: ");
  // console.log(categories);
  
  return (
    <div id="item-list-div">
      <div>Elige una categoria: </div>      
        {categories.map(u => <ItemCategory item={u}></ItemCategory>)}                        
    </div>   
  );
}