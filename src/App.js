import React from 'react';
import NavBar from "./components/NavBar/NavBar"
import Home from "./containers/Home/Home";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ItemDetailContainer } from "./containers/ItemDetailContainer/ItemDetailContainer";

export default function App() {    

  return (     
    <div>
      {<BrowserRouter>
        <NavBar></NavBar>
        <Switch>
          <Route exact path="/">
            <Home greeting="¡Bienvenidxs a tienda Fara León!"></Home>          
          </Route>
          <Route exact path="/ItemDetailContainer/:idSelected">
            <ItemDetailContainer></ItemDetailContainer>
          </Route>
        </Switch>
      </BrowserRouter>}      
    </div>
  );
}
