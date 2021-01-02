import {Container, Backdrop} from "@material-ui/core";
import ItemList from '../../components/ItemList/ItemList';
import React, { useState, useEffect, useContext } from "react";
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

export const CategoryDetailContainer = () => {           
    const { idCategorySelected } = useParams();

    const classes = useStyles();            

    const appContext = useContext(AppContext);    

    // snippet: uef
    useEffect(() => {
        appContext.getProductFromFirebaseByCategory(idCategorySelected);        
    }, [idCategorySelected]);      

    return (
            <div>                
                <Container className='container makeStyles-root-1 MuiAppBar-root MuiAppBar-positionStatic 
                    MuiPaper-elevation4 MuiToolbar-root MuiToolbar-regular MuiToolbar-gutters
                    MuiTypography-root makeStyles-title-3 MuiTypography-h6' maxWidth="sm"> 
                    {                      
                    (appContext.productsFromSelectedCategory === undefined) ?
                            (
                                <Backdrop className={classes.backdrop} open={true}>
                                    Cargando productos de la categoria seleccionada...
                                    <CircularProgress color="inherit" />
                                </Backdrop>                                  
                            ) :                         
                            (
                                <div>
                                    {                                                                            
                                        <ItemList itemList={appContext.productsFromSelectedCategory}>                                            
                                        </ItemList>                                                                                 
                                    }
                                </div>                            
                            )
                        }                                            
                </Container>                 
            </div>
    );
}