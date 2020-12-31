import {Container, Backdrop} from "@material-ui/core";
import {ItemDetail} from '../../components/ItemDetail/ItemDetail';
import React, { useEffect, useContext } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
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
    // useEffect(() => {
    //     appContext.getProductFromFirebaseById(idSelected);        
    // }, [idSelected]);      

    // useEffect(() => {
    //     appContext.getProductFromFirebaseById(idSelected);        
    // }, []);

    // El hook useEffect se ejecuta luego de el metodo render del componente.
    // Se ejecuta una sola vez si recibe como parametro al final un array vacio: []
    // Sino se ejecuta siempre que el componente se re-renderice.
    // Este useEffect recibe como parametro lo que sea que le mandes en la URL
    useEffect(() => {
        // console.log("idSelected inside useEffect");
        // console.log(idSelected);
        appContext.getProductFromFirebaseById(idSelected);        
    });

    return (
            <div>                
                <Container className='container makeStyles-root-1 MuiAppBar-root MuiAppBar-positionStatic 
                    MuiPaper-elevation4 MuiToolbar-root MuiToolbar-regular MuiToolbar-gutters
                    MuiTypography-root makeStyles-title-3 MuiTypography-h6' maxWidth="sm"> 
                    {/* { console.log("itemSelected: ") }
                    { console.log(appContext.itemSelected) } */}
                    
                    {                      
                    (appContext.itemSelected === undefined) ?
                            (
                                // <Backdrop className={classes.backdrop} open={true}>
                                //     Cargando creación seleccionada...
                                //     <CircularProgress color="inherit" />
                                // </Backdrop>                         
                                <Backdrop className={classes.backdrop} open={true}>
                                    No existe un producto con el ID ingresado. <br></br> 
                                    Presiona aquí para regresar al inicio ={">"}
                                    {/* {window.location = "/"} */}
                                    {/* <button onClick={GoHome()}>Ir al inicio</button>                                     */}
                                    <Button color="primary" style={{"margin-top": "30px"}} 
                                        onClick={() => window.location = "/"}>Ir al inicio</Button>                                    
                                    {/* <CircularProgress color="inherit" /> */}
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