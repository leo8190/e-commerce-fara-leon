import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import "./ItemCounter.css";

//stateless function component (sfc)
const ItemCounter = ({initialValue, maxValue, onAdd}) => {
  //usf (state variable using the state hook)
  //no uso una variable simple, usoState, pq sino cuando se renderice de nuevo el home, esta funcion...
  //...se ejecutara de nuevo y perdere el estado del contador, osea volveria a cero...
  const [counter, setCounter] = useState(parseInt(initialValue));

  //nfn (named function)
  const decrement = () => {
    if(counter !== 0){
      setCounter(counter - 1);
    }
  }

  const increment = () => {
    if(counter !== parseInt(maxValue)){
      setCounter(counter + 1);
    }
  }

  const onAddToCart = () => {
    onAdd(counter);
  }
  
  return (
    <div id="item-counter">      
      <h3>Seleccioná la cantidad deseada: {counter}</h3>            
      <Button class="buttons" onClick={decrement}>-</Button>
      <Button class="buttons" onClick={increment}>+</Button>            
      <br />
      <Button id="add-to-cart" class="buttons" onClick={onAddToCart}>
        Agregar al carrito
      </Button>
      <hr />
    </div>   
  );
}
 
export default ItemCounter;