import React from "react";
import NavBar from "./components/NavBar/NavBar"
import Checkout from "./components/Checkout/Checkout"
import Home from "./containers/Home/Home";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ItemDetailContainer } from "./containers/ItemDetailContainer/ItemDetailContainer";
import { AppProvider } from "./context/CartContext";
import { CategoryDetailContainer } from "./containers/CategoryDetailContainer/CategoryDetailContainer";

import TemporaryDrawer from "./components/Cart/Cart";

export default function App() {  

  return (     
    <div>
      {
        <AppProvider>
          <BrowserRouter>
            <NavBar></NavBar>
            <Switch>
            <Route exact path="/" component={Home}>
              <Home greeting="¡Bienvenidxs a tienda Fara León!"></Home>          
            </Route>
            <Route exact path="/CategoryDetailContainer/:idCategorySelected">
              <CategoryDetailContainer></CategoryDetailContainer>
            </Route>
            <Route exact path="/ItemDetailContainer/:idSelected">
              <ItemDetailContainer></ItemDetailContainer>
            </Route>
            <Route exact path="/Cart">
              <TemporaryDrawer></TemporaryDrawer>          
            </Route>
            <Route exact path="/Checkout">
              <Checkout></Checkout>          
            </Route>
            </Switch>
          </BrowserRouter>  
        </AppProvider>    
      }
    </div>
  );
}
