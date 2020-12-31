import React from "react";
import { NavLink } from 'react-router-dom';
import "./Item.css";

//stateless function component (sfc)
export const Item = ({item}) => {     
  return (            
    // <NavLink className="nav-links-items" to={`/ItemDetailContainer/${item.id}`}>
    <NavLink className="nav-links-items" to={`/ItemDetailContainer/${item.firebaseID}`}>
      {item.title}
    </NavLink>
  );
}
