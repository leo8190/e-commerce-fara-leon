import { Container } from "@material-ui/core";
import React from 'react';
import './Home.css';
import logoFara from './LogoFara.PNG';
import ItemCounter from '../../components/ItemCounter/ItemCounter';

const Home = ({greeting}) => {
    const printQuantity = (counter) => {
        alert("Se han agregado " + counter + " productos al carrito.");
    }
        
    return (
            <div>                
                    <ItemCounter initialValue="0" maxValue="10" onAdd={printQuantity}></ItemCounter>
                    <Container className='container makeStyles-root-1 MuiPaper-root MuiAppBar-root MuiAppBar-positionStatic 
                        MuiAppBar-colorPrimary MuiPaper-elevation4 MuiToolbar-root MuiToolbar-regular MuiToolbar-gutters
                        MuiTypography-root makeStyles-title-3 MuiTypography-h6' maxWidth="sm"> 
                        <p>
                            {greeting}
                        </p>                 
                        <img alt="" src={logoFara} />
                    </Container>                 
            </div>
    );
}

export default Home;