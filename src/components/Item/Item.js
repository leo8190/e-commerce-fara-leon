import React, { useState } from "react";
// import "./ItemList.css";

// console.log("aca llego!!!")

//stateless function component (sfc)
const Item = ({item}) => {     
  return (
    <li class="MuiAppBar-colorPrimary" id={item} class="items">        
      {item}
    </li>   
  );
}

export default Item;
