import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { AppContext } from "../../context/CartContext";
import Divider from '@material-ui/core/Divider';
import { BuyProducts } from "../../libs/firebaseUtils";
import Button from '@material-ui/core/Button';

const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

  export default function Review() {
    const selectionToBuy = useContext(AppContext);

    const [btnDisabled, setBtnDisabled] = useState(true)

    const classes = useStyles();

    let precioTotal = 0;

    selectionToBuy.products.map((product) => (    
        precioTotal = precioTotal + product.price * product.quantity
    ));


    useEffect(() => {
      validateEnteredInfo();  
    });     


//INICIO VALIDACION DE CAMPOS
const validateEmptyFields = () => {
  if(document.getElementById("nombre").value == "") return false;
  if(document.getElementById("apellido").value == "") return false;
  if(document.getElementById("telefono").value == "") return false;

  return true;
};

const validateEmailFields = () => {
  if(document.getElementById("e-mail").value !=
      document.getElementById("confirmacion-e-mail").value)
                      return false;
  else
      return true;
};

const validateEnteredInfo = () => {
    console.log("ValidateAndBuiyProducts executed");
    if(validateEmptyFields() && validateEmailFields()){
      setBtnDisabled(false);
      // document.getElementById("botonFinalizarCompra").disabled = true;
      // console.log("ValidateAndBuiyProducts executed and is true");
    }
    else{
      setBtnDisabled(true);
      // document.getElementById("botonFinalizarCompra").disabled = false;
      // console.log("ValidateAndBuiyProducts executed and is false");
    }
    // else if (validateEmptyFields() == false) {
    //     alert("Error en los datos ingresados");
    // }
    // else if (validateEmailFields() == false) {
    //     alert("Error en los datos ingresados");
    // }
}; 
//FIN VALIDACION DE CAMPOS


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Resumen de tu compra
      </Typography>
      <List disablePadding>
        {selectionToBuy.products.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={'Producto: ' + product.name} 
                          secondary={'Cantidad: ' + product.quantity} />            
            <ListItemText primary={'Precio unitario: ' + product.price} />            
            <ListItemText primary={'Precio total del producto: ' + product.price * product.quantity} />            
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            $ {precioTotal}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Ingresá tu información
          </Typography>          
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="nombre"
              name="firstName"
              label="Nombre"
              fullWidth
              autoComplete="given-name"
              onChange={() => validateEnteredInfo()}              
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="apellido"
              name="lastName"
              label="Apellido"
              fullWidth
              autoComplete="family-name"
              onChange={() => validateEnteredInfo()}              
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="telefono"
              name="address1"
              label="Teléfono"
              fullWidth
              autoComplete="shipping address-line1"
              onChange={() => validateEnteredInfo()}              
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="e-mail"
              name="address2"
              label="E-mail"
              fullWidth
              autoComplete="shipping address-line2"
              onChange={() => validateEnteredInfo()}              
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="confirmacion-e-mail"
              name="city"
              label="Confirmá tu e-mail"
              fullWidth
              autoComplete="shipping address-level2"
              onChange={() => validateEnteredInfo()}              
            />
          </Grid>
          <Button
                    disabled={btnDisabled}
                    id="botonFinalizarCompra"
                    variant="contained"
                    color="primary"
                    // onClick={handleNext}
                    onClick={ function(){ BuyProducts(selectionToBuy.products) } }
                    className={classes.button}
                  >
                    {'Realizar compra'}
          </Button>
        </Grid>        
      </Grid>
    </React.Fragment>
  );
}





