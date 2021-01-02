import {Container, Backdrop} from "@material-ui/core";
import {ItemDetail} from '../../components/ItemDetail/ItemDetail';
import React, { useEffect, useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { AppContext } from "../../context/CartContext";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

export const ItemDetailContainer = () => {           
    const { idSelected } = useParams();

    const classes = useStyles();            

    const appContext = useContext(AppContext);

    //snippet: uef   
    // El hook useEffect se ejecuta luego de el metodo render del componente.
    // Se ejecuta una sola vez si recibe como parametro al final un array vacio: []
    // Sino se ejecuta siempre que el componente se re-renderice.
    // Este useEffect recibe como parametro lo que sea que le mandes en la URL
    useEffect(() => {        
        appContext.getProductFromFirebaseById(idSelected);        
    });

    return (
            <div>                
                <Container className='container makeStyles-root-1 MuiAppBar-root MuiAppBar-positionStatic 
                    MuiPaper-elevation4 MuiToolbar-root MuiToolbar-regular MuiToolbar-gutters
                    MuiTypography-root makeStyles-title-3 MuiTypography-h6' maxWidth="sm">                                         
                    
                    {                      
                    (appContext.itemSelected === undefined) ?
                            (                                                     
                                <Backdrop className={classes.backdrop} open={true}>
                                    No existe un producto con el ID ingresado. <br></br> 
                                    Presiona aquí para regresar al inicio ={">"}                                                                        
                                    <Button color="primary" style={{"margin-top": "30px"}} 
                                        onClick={() => window.location = "/"}>Ir al inicio</Button>                                                                        
                                </Backdrop>                                                                  
                            ) :                         
                            (
                                <div>
                                    {                                                                            
                                        <ItemDetail itemDetail={appContext.itemSelected}></ItemDetail>                                         
                                    }
                                </div>                            
                            )
                        }                                
                </Container>                 
            </div>
    );
}

function GoHome(){ window.location = "/" }