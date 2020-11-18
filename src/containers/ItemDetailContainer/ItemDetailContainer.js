import {Container, Backdrop} from "@material-ui/core";
import {useState, useEffect} from 'react';
import {ItemDetail} from '../../components/ItemDetail/ItemDetail';
import {getProductFromDatabaseById} from '../../lib/database'
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

export const ItemDetailContainer = ({}) => {           
    const { idSelected } = useParams();
    
    // console.log("idSelected: " + idSelected);

    const classes = useStyles();
        
    const [product, setProduct] = useState([]);    

    //snippet: uef
    useEffect(() => {
        getProductFromDatabaseById(idSelected)
            .then((result) => {
                // console.log("getProductFromDatabaseById: " + result);                
                // console.log("getProductFromDatabaseById: " + JSON.stringify(result));
                return result;
            })
            .then((result) => {
                setProduct(result); 
            });
    }, [idSelected]);      

    return (
            <div>                
                <Container className='container makeStyles-root-1 MuiAppBar-root MuiAppBar-positionStatic 
                    MuiPaper-elevation4 MuiToolbar-root MuiToolbar-regular MuiToolbar-gutters
                    MuiTypography-root makeStyles-title-3 MuiTypography-h6' maxWidth="sm"> 
                    {/* {console.log("product.name: " + product.name)}                 */}
                    {                      
                    (product.name === undefined) ?
                            (
                                <Backdrop className={classes.backdrop} open={true}>
                                    Cargando creación seleccionada...
                                    <CircularProgress color="inherit" />
                                </Backdrop>                                  
                            ) :                         
                            (
                                <div>
                                    {                                                                            
                                        <ItemDetail itemDetail={product}></ItemDetail>                                         
                                    }
                                </div>                            
                            )
                        }                                
                </Container>                 
            </div>
    );
}