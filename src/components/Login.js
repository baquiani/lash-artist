import React, {useState} from 'react'
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

function LoginForm(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const API_URL = 'https://6348-86-127-76-46.ngrok-free.app'

    const handleSubmit= async (event) => {
        event.preventDefault();
        try{
            const response= await axios.post('https://6348-86-127-76-46.ngrok-free.app/api/login', {email, password});

            setMessage(response.data.message);
            setIsError(false);

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            navigate('/');

            window.location.reload();
        }
        catch(error){

            setMessage(error.response.data.message);
            setIsError(true);
        }
    };

    return(
        <Container>
            {message && <Alert variant={isError ? "danger" : "success"}>{message}</Alert>}
            <Form onSubmit={handleSubmit} className='m-2' style={{maxWidth:'400px', textAlign:'left'}}>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder='enter your email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>


                <Form.Group controlId="formEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>


                <Button variant="primary" type="submit" className='mt-5'>Login</Button>
            </Form>
        </Container>
        

    )
}

export default LoginForm;