import {Container, Backdrop} from "@material-ui/core";
import './Home.css';
import logoFara from './LogoFara.PNG';
import ItemList from '../../components/ItemList/ItemList';
import {getProductsFromDatabase} from '../../lib/database'
import React, { useContext } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from "../../context/CartContext";
import {Categories} from '../../components/Categories/Categories';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

const Home = ({greeting}) => {
    const classes = useStyles();   
    
    const dataFromFirebase = useContext(AppContext);      

    // console.log("categories in home: ");
    // console.log(dataFromFirebase.categories);

    return (
            <div>                
                    <Container className='container makeStyles-root-1 MuiAppBar-root MuiAppBar-positionStatic 
                        MuiPaper-elevation4 MuiToolbar-root MuiToolbar-regular MuiToolbar-gutters
                        MuiTypography-root makeStyles-title-3 MuiTypography-h6' maxWidth="sm"> 
                        <p> {greeting} </p>                                       
                        {dataFromFirebase.categories === undefined ? 
                            (
                                <Backdrop className={classes.backdrop} open={true}>                                    
                                    Cargando categorías de productos...
                                    <CircularProgress color="inherit" />
                                </Backdrop>  
                            ) :                         
                            (
                                <div>
                                    {   
                                        <Categories id="item-list" 
                                            categories={dataFromFirebase.categories}>                                        
                                        </Categories>                                                                                                       
                                    }
                                </div>                            
                            )
                        }
                        { <img alt="" src={logoFara} />                         }
                    </Container>                 
            </div>
    );
}

export default Home;