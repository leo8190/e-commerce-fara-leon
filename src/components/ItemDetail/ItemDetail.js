import React, { useState }  from "react";
import ItemCounter from "../ItemCounter/ItemCounter";
import { NavLink } from 'react-router-dom';

//stateless function component (sfc)
export const ItemDetail = ({itemDetail}) => {        

    const [counterForButton, setCounterForButton] = useState(0);

    const printQuantity = (counter) => {
        alert("Se han agregado " + counter + " productos '" + itemDetail.name + "' al carrito.");        
    }

    const onIncrementOrDecrement = (counter) => {        
        setCounterForButton(counter);
    }

    return (
        <div >            
            <p>{itemDetail.name}</p>
            <p>$ {itemDetail.price}</p>
            <p>Stock: {itemDetail.stock}</p>                                        
            <ItemCounter initialValue="0" maxValue="10" onAdd={printQuantity} 
                onIncrementOrDecrement={onIncrementOrDecrement}></ItemCounter>
            <button>Comprar {counterForButton} unidades</button>
            <br />
            <button>
                <NavLink style={{"text-decoration": "none !important"}} to={`/`}>Volver al listado</NavLink>
            </button>
        </div>
    );
}