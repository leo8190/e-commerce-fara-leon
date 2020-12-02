import React, { useContext, useState, useEffect } from 'react';

export const AppContext = React.createContext();

export const AppProvider = ({children}) => {

    const [productName, setProductName] = useState("No hay productos seleccionados");
    const [selectedQuantity, setSelectedQuantity] = useState(0);

    useEffect(() => {
        return () => {}
    }, []);

    const changeProductName = (newName) => {
        setProductName(newName);
        console.log('product name changed');
    }

    const changeSelectedQuantity = (newQuantity) => {
        setSelectedQuantity(newQuantity);
    }
     
    return <AppContext.Provider value={{productName, selectedQuantity, changeProductName, changeSelectedQuantity}}>
        {children}
    </AppContext.Provider>
}
