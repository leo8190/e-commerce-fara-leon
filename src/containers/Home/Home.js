import {Container, Backdrop} from "@material-ui/core";
import {useState, useEffect} from 'react';
import './Home.css';
import logoFara from './LogoFara.PNG';
import ItemCounter from '../../components/ItemCounter/ItemCounter';
import ItemList from '../../components/ItemList/ItemList';
import getProductsFromDatabase from '../../lib/database'
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

const Home = ({greeting}) => {
    const classes = useStyles();

    const printQuantity = (counter) => {
        alert("Se han agregado " + counter + " productos al carrito.");        
    }
        
    const [products, setProducts] = useState([]);

    //snippet: uef
    useEffect(() => {
        getProductsFromDatabase()
            .then((result) => {
                return JSON.parse(result);
            })
            .then((result) => {
                setProducts(result);            
            });
    }, []);

    return (
            <div>                
                    <Container className='container makeStyles-root-1 MuiAppBar-root MuiAppBar-positionStatic 
                        MuiPaper-elevation4 MuiToolbar-root MuiToolbar-regular MuiToolbar-gutters
                        MuiTypography-root makeStyles-title-3 MuiTypography-h6' maxWidth="sm"> 
                        <p> {greeting} </p>                                       
                        {products.length === 0 ? 
                            (
                                <Backdrop className={classes.backdrop} open={true}>
                                    Cargando listado de nuestras creaciones...
                                    <CircularProgress color="inherit" />
                                </Backdrop>  
                            ) :                         
                            (
                                <div>
                                    {                                    
                                        <ItemList id="item-list" itemList={products}>                                            
                                        </ItemList>                                    
                                    }
                                </div>                            
                            )
                        }
                        <ItemCounter initialValue="0" maxValue="10" onAdd={printQuantity}></ItemCounter>
                        <img alt="" src={logoFara} />                        
                    </Container>                 
            </div>
    );
}

export default Home;