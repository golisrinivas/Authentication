import {Component} from 'react';

import Cookies from 'js-cookie';

import { Navigate } from 'react-router-dom';

class Home extends Component{
    
        


    render(){
        const jwtToken = Cookies.get("jwt_token");
        if (jwtToken === undefined){
            return <Navigate to = "/login"/>
        }
        return(
            <h1>srinivasRao Goli</h1>
        )
    }
}

export default Home;