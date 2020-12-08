import React from "react";
import { Item } from "../Item/Item.js";
import "./ItemList.css";
import { NavLink } from 'react-router-dom';

//stateless function component (sfc)
//le mando por ej un array de strings con los nombres de los productos
const ItemList = ({itemList}) => {   
  // console.log("itemList: ");
  // console.log(itemList);

  return (    
    <div>
      <div id="item-list-div">
        <div>Nuestras creaciones: </div>      
          {itemList.map(u => <Item item={u}></Item>)}                 
      </div>
      <button>
        <NavLink style={{"text-decoration": "none !important"}} to={`/`}>
          Volver al listado de categorías
        </NavLink>    
      </button>
    </div>
  );
}

export default ItemList
