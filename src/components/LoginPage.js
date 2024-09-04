import React from 'react';
import LoginForm from './Login';
import {Container,Row,Col} from 'react-bootstrap'



function LoginPage(){
    return(

        <Container fluid className=" pt-4 text-center">
            <Row  className='mb-4 pb-4'>
                <Col md={{span: 6, offset:3}}>
                <h1 className='border-bottom border-dark pb-3'>Login</h1>
                </Col>
                
            </Row>

            <Row>
                <Col md={{span: 6, offset:3}}>
                <LoginForm className="text-bold"/>
                </Col>
            </Row>
            <div>
            
            <br></br>
            
            </div>
        </Container>
        
    );
}


export default LoginPage;