import React from "react";
import ItemCounter from "../ItemCounter/ItemCounter";
import { NavLink } from 'react-router-dom';

//stateless function component (sfc)
export const ItemDetail = ({itemDetail}) => {        
    console.log(itemDetail);

    const printQuantity = (counter) => {
        alert("Se han agregado " + counter + " productos '" + itemDetail.name + "' al carrito.");        
    }

    return (
        <div >            
            <p>{itemDetail.name}</p>
            <p>$ {itemDetail.price}</p>
            <p>Stock: {itemDetail.stock}</p>                                        
            <ItemCounter initialValue="0" maxValue="10" onAdd={printQuantity}></ItemCounter>
            <button>Comprar</button>
            <br />
            <button>
                <NavLink style={{"text-decoration": "none !important"}} to={`/`}>Volver al listado</NavLink>
            </button>
        </div>
    );
}