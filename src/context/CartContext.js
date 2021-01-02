import React, { useContext, useState, useEffect } from 'react';
import { getFirestore } from '../firebase/index';

export const AppContext = React.createContext();

export const AppProvider = ({children}) => {

    const [products, setProductNames] = useState([]);
    const [productsQuantity, setProductsQuantity] = useState(0);            

    const addProduct = (newProduct) => {
        let isNewProduct = true;

        // console.log("newProduct:");
        // console.log(newProduct);

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

        console.log("products:");
        console.log(products);

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
    
    let executeUseEffect = false;

    const getProductFromFirebaseById = (idSelected) => {                        
        let itemSelectedAux;   

        if(productsInDatabase == undefined){
            console.log("productsInDatabase == undefined");
            console.log(productsInDatabase == undefined);
            executeUseEffect = true;
        }
        
        if(productsInDatabase != undefined) {
            for(var i = 0; i < productsInDatabase.length; i++){                        
                if(productsInDatabase[i].firebaseID == idSelected){
                    itemSelectedAux = productsInDatabase[i];                            
                }
            }      
            setItemSelected(itemSelectedAux);
        }    
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

    // en este useEffect llamo a Firestore para obtener los productos disponibles
    useEffect(() => {  
      // Referencia a la BBDD en Firestore
      const db = getFirestore();        
      const itemCollection = db.collection("products");               
      const categoriesCollection = db.collection("productCategories");               
      let firebaseIDs = []
      
      // Pedimos los productos
      itemCollection.get().then((response) => {                   
        //filtrar por categoria
        const productsInFirebase = response.docs.map(element => {                      
            
            // AGREGO LOS ID DE LOS DOCUMENTO DE FIREBASE A UN ARRAY            
            firebaseIDs.push(element.id);                                    
            
            return element.data();      
        })      
        // Guardamos los datos en estado        
        for(let i = 0; i < firebaseIDs.length; i++){            
            productsInFirebase[i].firebaseID = firebaseIDs[i];            
        }

        setProductsInDatabase(productsInFirebase);            
      });

      // Pedimos las categorias
      categoriesCollection.get().then((response) => {                   
        const categoriesAux = response.docs.map(element => {          
            return element.data();      
        })      
        // Guardamos los datos en estado        
        setCategories(categoriesAux);            
      });
  
    }, [executeUseEffect]);    

    return <AppContext.Provider value={{products, productsQuantity, productsInDatabase, itemSelected,
                                             categories, productsFromSelectedCategory, addProduct,
                                             getProductFromFirebaseByCategory, getProductFromFirebaseById}}>
            {children}
    </AppContext.Provider>
}
