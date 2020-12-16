import React, { useState, useContext }  from "react";
import ItemCounter from "../ItemCounter/ItemCounter";
import { NavLink } from 'react-router-dom';
import { AppContext } from "../../context/CartContext";

//stateless function component (sfc)
export const ItemDetail = ({itemDetail}) => {            

    // console.log("itemDetail: ");
    // console.log(itemDetail);

    const appContext = useContext(AppContext);

    const [counterForButton, setCounterForButton] = useState(0);

    const printQuantity = (counter) => {   
        if(counter > 0){         
            const product = {id: itemDetail.id, title: itemDetail.title, price: itemDetail.price,
                 quantity: counter}   
            appContext.addProduct(product);            
            alert("Se han agregado " + counter + " productos '" + itemDetail.title + "' al carrito.");        
        }
        else{
            alert("La cantidad debe ser al menos 1");        
        }                 
    }

    const onIncrementOrDecrement = (counter) => {        
        setCounterForButton(counter);
    }

    return (
        <div >            
            <p>{itemDetail.title}</p>
            <p>$ {itemDetail.price}</p>
            <p>Stock: {itemDetail.stock}</p>                                        
            <ItemCounter initialValue="0" maxValue={itemDetail.stock} onAdd={printQuantity} 
                onIncrementOrDecrement={onIncrementOrDecrement}>
            </ItemCounter>
            <br />
            <button>
                <NavLink style={{"text-decoration": "none !important"}} to={`/`}>
                    Volver al listado de categorías
                </NavLink>
            </button>
        </div>
    );
}