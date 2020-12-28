import React, { useState, useContext }  from "react";
import ItemCounter from "../ItemCounter/ItemCounter";
import { NavLink } from 'react-router-dom';
import { AppContext } from "../../context/CartContext";
import cuencoBatik from '../../images/CuencoBatik.PNG';
import cuencoYMano from '../../images/CuencoYMano.PNG';
import laUnion from '../../images/LaUnion.PNG';
import senderoDeLuzArcoiris from '../../images/SenderoDeLuzArcoiris.PNG';
import velaSenderoDeLuz from '../../images/VelaSenderoDeLuz.PNG';

//stateless function component (sfc)
export const ItemDetail = ({itemDetail}) => {            

    // console.log("itemDetail: ");
    // console.log(itemDetail);

    const appContext = useContext(AppContext);

    const [counterForButton, setCounterForButton] = useState(0);

    const printQuantity = (counter) => {   
        if(counter > 0){         
            const product = {name: itemDetail.title, quantity: counter, id: itemDetail.id, 
                price: itemDetail.price};
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
    
    let selectedProduct;    

    if(laUnion.includes(itemDetail.imageFileName)) selectedProduct = laUnion;
    if(cuencoBatik.includes(itemDetail.imageFileName)) selectedProduct = cuencoBatik;
    if(cuencoYMano.includes(itemDetail.imageFileName)) selectedProduct = cuencoYMano;
    if(velaSenderoDeLuz.includes(itemDetail.imageFileName)) selectedProduct = velaSenderoDeLuz;
    if(senderoDeLuzArcoiris.includes(itemDetail.imageFileName)) selectedProduct = senderoDeLuzArcoiris;

    // ("selectedProduct");
    // console.log(selectedProduct);

    return (
        <div >            
            <p>{itemDetail.title}</p>
            <p>$ {itemDetail.price}</p>
            <p>Stock: {itemDetail.stock}</p>   
            {console.log("url of image")}                                     
            {console.log(itemDetail.image)}
            {/* {console.log(itemDetail.image.getDownloadURL)}             */}
            {/* {console.log(imageUrl)} */}
            <img alt=""                
                src={selectedProduct}                
            >
            </img>
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