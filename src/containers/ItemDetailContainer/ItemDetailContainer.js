import {Container, Backdrop} from "@material-ui/core";
import {ItemDetail} from '../../components/ItemDetail/ItemDetail';
import React, { useEffect, useContext } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { AppContext } from "../../context/CartContext";

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
    useEffect(() => {
        appContext.getProductFromFirebaseById(idSelected);        
    }, [idSelected]);      

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
                                <Backdrop className={classes.backdrop} open={true}>
                                    Cargando creación seleccionada...
                                    <CircularProgress color="inherit" />
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