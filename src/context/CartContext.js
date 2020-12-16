import React, { useContext, useState, useEffect } from 'react';
import { getFirestore } from '../firebase/index';

export const AppContext = React.createContext();

export const AppProvider = ({children}) => {

    const [products, setProductNames] = useState([]);
    const [productsQuantity, setProductsQuantity] = useState(0);        

    useEffect(() => {
        return () => {}
    }, []);

    const addProduct = (newProduct) => {
        let isNewProduct = true;

        // console.log("newProduct:");
        // console.log(newProduct);

        //recorro el array para ver si ese producto ya fue agregado
        for(var i = 0; i < products.length; i++){
            if(products[i].name === newProduct.title){
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

        //actualizo la cantidad de productos totales
        let auxProductsQuantity = 0;        
        for(var i = 0; i < products.length; i++){
            auxProductsQuantity = auxProductsQuantity + products[i].quantity;                            
        }
        setProductsQuantity(auxProductsQuantity);        
    }     
     

    //TRAIGO LOS PRODUCTOS DESDE FIREBASE
    const [productsInDatabase, setProductsInDatabase] = useState();
    const [itemSelected, setItemSelected] = useState();
    const [categories, setCategories] = useState();
    const [productsFromSelectedCategory, setProductsFromSelectedCategory] = useState();

    const getProductFromFirebaseById = (idSelected) => {                        
        let itemSelectedAux;    
        for(var i = 0; i < productsInDatabase.length; i++){                        
            if(productsInDatabase[i].id == idSelected){
                itemSelectedAux = productsInDatabase[i];                            
            }
        }      
        // console.log("itemSelectedAux: ");
        // console.log(itemSelectedAux);
        setItemSelected(itemSelectedAux);
    }

    const getProductFromFirebaseByCategory = (idCategory) => {   
        // console.log("idCategory: ");                    
        // console.log(idCategory);                    
        let productsFromSelectedCategoryAux = [];    
        for(var i = 0; i < productsInDatabase.length; i++){                        
            // console.log("categoryId inside for: ");
            // console.log(productsInDatabase[i].categoryId);
            if(productsInDatabase[i].categoryId == idCategory){
                productsFromSelectedCategoryAux.push(productsInDatabase[i]);                            
            }
        }      
        // console.log("productsFromSelectedCategoryAux: ");
        // console.log(productsFromSelectedCategoryAux);
        setProductsFromSelectedCategory(productsFromSelectedCategoryAux);
    }

    useEffect(() => {  
      // Referencia
      const db = getFirestore();        
      const itemCollection = db.collection("products");               
      const categoriesCollection = db.collection("productCategories");               
      
      // Pedimos los productos
      itemCollection.get().then((response) => {                   
        //filtrar por categoria
        const productsInFirebase = response.docs.map(element => {          
            return element.data();      
        })      
        // Guardamos los datos en estado
        setProductsInDatabase(productsInFirebase);            
      });

      // Pedimos las categorias
      categoriesCollection.get().then((response) => {                   
        const categoriesAux = response.docs.map(element => {          
            return element.data();      
        })      
        // Guardamos los datos en estado
        // console.log("categories in cartContext: ");
        // console.log(categoriesAux);
        setCategories(categoriesAux);            
      });
  
    }, []);  

    return <AppContext.Provider value={{products, productsQuantity, productsInDatabase, itemSelected,
                                             categories, productsFromSelectedCategory, addProduct,
                                             getProductFromFirebaseByCategory, getProductFromFirebaseById}}>
            {children}
    </AppContext.Provider>
}
