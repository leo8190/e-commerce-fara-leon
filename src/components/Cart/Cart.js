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
          {/* esto tiene que mostrarse tantas veces como productos haya en el array */}         
                  {selectionToBuy.products.length === 0 
                      ?

                      <ListItem button key="No hay productos en el carrito">            
                          <ListItemText primary="No hay productos en el carrito"/>
                      </ListItem> 
                      :

                      <div>
                        <ListItem button key="Productos en el carrito: ">            
                            <ListItemText primary="Productos en el carrito: "/>
                        </ListItem>                
                        <Divider />   
                        {
                          selectionToBuy.products.map((p) => (
                            <div>
                              <ListItem button key={p.name}>            
                                <ListItemText primary={p.name} secondary={"Cantidad: " + p.quantity}/>
                              </ListItem>
                              <Divider />      
                            </div> 
                          ))
                        }
                        <Divider />            
                        <ListItem button>            
                          <button>Finalizar compra</button>  
                        </ListItem>  
                      </div>
                  }                                  
          <Divider />       
          <ListItem button>            
            <NavLink style={{"text-decoration": "none !important"}} to={`/`}>Volver al listado de categorías
            </NavLink>
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
