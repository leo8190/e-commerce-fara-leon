import React, { useState, useContext }  from "react";
import ItemCounter from "../ItemCounter/ItemCounter";
import { NavLink } from 'react-router-dom';
import { AppContext } from "../../context/CartContext";

//stateless function component (sfc)
export const ItemDetail = ({itemDetail}) => {            

    const appContext = useContext(AppContext);

    const [counterForButton, setCounterForButton] = useState(0);

    const printQuantity = (counter) => {   
        if(counter > 0){         
            const product = {name: itemDetail.name, quantity: counter}   
            appContext.addProduct(product);
            // appContext.selectProductName();
            // appContext.selectQuantity();
            alert("Se han agregado " + counter + " productos '" + itemDetail.name + "' al carrito.");        
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
            <p>{itemDetail.name}</p>
            <p>$ {itemDetail.price}</p>
            <p>Stock: {itemDetail.stock}</p>                                        
            <ItemCounter initialValue="0" maxValue={itemDetail.stock} onAdd={printQuantity} 
                onIncrementOrDecrement={onIncrementOrDecrement}>
            </ItemCounter>
            <br />
            <button>
                <NavLink style={{"text-decoration": "none !important"}} to={`/`}>Volver al listado</NavLink>
            </button>
        </div>
    );
}