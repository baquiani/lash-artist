import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function RegistrationForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

  

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('https://6348-86-127-76-46.ngrok-free.app/api/register', { name, email, password });
            setMessage(response.data.message);
            setIsError(false);
        } catch (error) {
            setMessage(error.response.data.message);
            setIsError(true);
        }
    };

    return (
        <Container className='d-flex flex-column min-vh-100'>
            {message && <Alert variant={isError ? "danger" : "success"}>{message}</Alert>}
            <Form onSubmit={handleSubmit} className='m-2' style={{ maxWidth: '400px', textAlign: 'left' }}>
                <Form.Group controlId="FormName">
                    <Form.Label>User</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Choose username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className='mt-4' controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className='mt-5'>
                    Register
                </Button>
            </Form>
        </Container>
    );
}

export default RegistrationForm;
