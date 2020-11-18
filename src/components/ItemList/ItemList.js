import React from "react";
import { Item } from "../Item/Item.js";
import "./ItemList.css";
// import "./ItemList.css";

//stateless function component (sfc)
//le mando por ej un array de strings con los nombres de los productos
const ItemList = ({itemList}) => {   
  return (
    <div id="item-list-div">
      <div>Nuestras creaciones: </div>      
        {itemList.map(u => <Item item={u}></Item>)}      
    </div>   
  );
}

export default ItemList
