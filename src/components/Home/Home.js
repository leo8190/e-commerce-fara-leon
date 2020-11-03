import { Container } from "@material-ui/core";
import React from 'react';
import './Home.css';
import logoFara from './LogoFara.PNG';

export default class Home extends React.Component {
    constructor() {     
        super();   
        this.state = {
             greeting: ['¡Bienvenidxs a tienda Fara León!'] 
       }
    }    

    render() {
        return (
            <div>
                { 
                    <Container className='container makeStyles-root-1 MuiPaper-root MuiAppBar-root MuiAppBar-positionStatic 
                        MuiAppBar-colorPrimary MuiPaper-elevation4 MuiToolbar-root MuiToolbar-regular MuiToolbar-gutters
                        MuiTypography-root makeStyles-title-3 MuiTypography-h6' maxWidth="sm"> 
                        <p>
                            { this.state.greeting }
                        </p>                 
                        <img alt="" src={logoFara} />
                    </Container> 
                }
            </div>
        );
    }
}