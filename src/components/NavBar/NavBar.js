import React, { useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CartIcon from "./CartIcon/CartIcon";
import { NavLink } from 'react-router-dom';
import "./NavBar.css";
import Badge from '@material-ui/core/Badge';
import { AppContext } from "../../context/CartContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const classes = useStyles();

  const selectionToBuy = useContext(AppContext);      

  return (
    <div id="nav-bar" className={classes.root}>
      <AppBar style={{ background: '#a2836e' }} position="static">
        <Toolbar>          
          <Typography variant="h6" className={classes.title}>
            FARA LEON - Objetos de Diseño
          </Typography>          
          <NavLink to="/Cart" > 
            <Badge badgeContent={selectionToBuy.productsQuantity} color="primary">     
              <CartIcon />
            </Badge>
          </NavLink>          
        </Toolbar>
      </AppBar>
    </div>
  );
}