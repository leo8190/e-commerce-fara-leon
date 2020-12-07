import React, { useContext, useState, useEffect } from 'react';

export const AppContext = React.createContext();

export const AppProvider = ({children}) => {
    
    // const productNames = [];
    // const productQuantities = [];
    const [products, setProductNames] = useState([]);
    const [productsQuantity, setProductsQuantity] = useState(0);        

    useEffect(() => {
        return () => {}
    }, []);


    const addProduct = (newProduct) => {
        let isNewProduct = true;

        //recorro el array para ver si ese producto ya fue agregado
        for(var i = 0; i < products.length; i++){
            if(products[i].name === newProduct.name){
                //si ya fue agregado, agrego al mismo la cantidad correspondiente
                products[i].quantity = products[i].quantity + newProduct.quantity;
                isNewProduct = false;
            }            
        }

        //si aun no fue agregado, lo agrego
        if(isNewProduct){
            products.push(newProduct);
        }

        //actualizo el array
        setProductNames(products);
        // console.log('product added');

        //actualizo la cantidad de productos totales
        let auxProductsQuantity = 0;        
        for(var i = 0; i < products.length; i++){
            auxProductsQuantity = auxProductsQuantity + products[i].quantity;
            console.log("product counted");                
        }
        setProductsQuantity(auxProductsQuantity);
        console.log("quantity counted: " + auxProductsQuantity);
    }

    // const addProductAndQuantity = (newQuantity) => {
    //     productQuantities.push(newQuantity);        
    //     setProductQuantities(productQuantities);
    // }
     
    return <AppContext.Provider value={{products, productsQuantity, addProduct }}>
            {children}
    </AppContext.Provider>
}
