import React from "react";
import { NavLink } from 'react-router-dom';

//stateless function component (sfc)
export const ItemCategory = ({item}) => {     
  return (            
    <NavLink className="nav-links-items" to={`/CategoryDetailContainer/${item.id}`}>
      {item.title}
    </NavLink>
  );
}
