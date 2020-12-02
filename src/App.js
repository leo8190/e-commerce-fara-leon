import React, { useState }  from "react";
import NavBar from "./components/NavBar/NavBar"
import Home from "./containers/Home/Home";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ItemDetailContainer } from "./containers/ItemDetailContainer/ItemDetailContainer";
import { AppProvider } from "./context/CartContext";
import TemporaryDrawer from "./components/Cart/Cart";

export default function App() {      

  return (     
    <div>
      {
        <AppProvider>
          <BrowserRouter>
            <NavBar></NavBar>
            <Switch>
            <Route exact path="/">
              <Home greeting="¡Bienvenidxs a tienda Fara León!"></Home>          
            </Route>
            <Route exact path="/ItemDetailContainer/:idSelected">
              <ItemDetailContainer></ItemDetailContainer>
            </Route>
            <Route exact path="/Cart">
              {/* <Cart></Cart> */}
              <TemporaryDrawer></TemporaryDrawer>          
            </Route>
            </Switch>
          </BrowserRouter>  
        </AppProvider>    
      }
    </div>
  );
}
