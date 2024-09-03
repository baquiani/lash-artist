import React from 'react';
import RegistrationForm from './Registration';
import {Container} from 'react-bootstrap'



function RegistrationPage(){
    return(

        <Container fluid className="g-0 pb-5 text-center mt-4">
            <div>
            <h1>Inregistrare</h1>
            <br></br>
            <RegistrationForm className="text-bold"/>
            </div>
        </Container>
        
    );
}


export default RegistrationPage;