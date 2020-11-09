import React from 'react';
import NavBar from "./components/NavBar/NavBar"
import Home from "./containers/Home/Home";

export default function App() {  
  return (     
    <div>                    
      <NavBar></NavBar>
      <Home greeting="¡Bienvenidxs a tienda Fara León!"></Home>          
    </div>
  );
}
