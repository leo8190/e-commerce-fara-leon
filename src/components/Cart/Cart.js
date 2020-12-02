import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React, { useContext } from "react";
import { AppContext } from "../../context/CartContext";
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer() {
  const selectionToBuy = useContext(AppContext);

  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: true,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, true)}
      onKeyDown={toggleDrawer(anchor, true)}
    >
      <List>        
          <ListItem button key={selectionToBuy.productName}>            
            <ListItemText primary="Producto en carrito: " secondary={selectionToBuy.productName}/>
          </ListItem>
          <Divider />      
          <ListItem button key={selectionToBuy.selectedQuantity}>            
            <ListItemText primary="Cantidad seleccionada: " secondary={selectionToBuy.selectedQuantity}/>
          </ListItem>  
          <Divider />            
          <ListItem button key={selectionToBuy.selectedQuantity}>            
            <button>Finalizar compra</button>  
          </ListItem>       
          <Divider />       
          <ListItem button key={selectionToBuy.selectedQuantity}>            
            <NavLink style={{"text-decoration": "none !important"}} to={`/`}>Volver al listado</NavLink>
          </ListItem>       
      </List>                               
    </div>
  );

  return (
    <div>
      {['left', 'right', 'top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, true)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
