import React from 'react';
import LoginForm from './Login';
import {Container} from 'react-bootstrap'



function LoginPage(){
    return(

        <Container fluid className="g-0 pb-5 text-center mt-4">
            <div>
            <h1>Login</h1>
            <br></br>
            <LoginForm className="text-bold"/>
            </div>
        </Container>
        
    );
}


export default LoginPage;