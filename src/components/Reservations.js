import React, {useState, useEffect} from 'react';
import {Container, Form, Button, Alert} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';


const ReservationForm = () => {

    const [isLoggedIn, setIsLoggedIn] = useState((false));
    const [selectedDate, setSelectedDate] = useState(null);
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const [unavailableDates, setUnavailableDates]=useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() =>{
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
      }, []);

      
    useEffect(() =>{
        axios.get('http://localhost:5000/api/reservations/unavailable-dates')
        .then (response => setUnavailableDates(response.data))
        .catch(error=> console.error(error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const date = new Date(selectedDate);
        const formattedDate = date.toISOString();

        axios.post('http://localhost:5000/api/reservations', {name,email,date: formattedDate})

        .then(response =>{

            setSuccessMessage('Rezervare confirmata!');

            setName('');
            setEmail('');
            setSelectedDate(null);
        })
    }



return (
    <Container fluid className='m-5 d-flex flex-column min-vh-100'>
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {isLoggedIn ? (<Form onSubmit={handleSubmit} className='g-0 mt-5 pt-5 align-items-center' style={{maxWidth:'400px', textAlign:'left'}}>
            <Form.Group controlId="FormName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder = "Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}

                    required>
                
                
                
                </Form.Control>
            
            
            </Form.Group>


            <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder = "Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}

                    required>
                
                
                
                </Form.Control>
            
            
            </Form.Group>
        

            <Form.Group className='mt-4' controlId="formDate">
                <Form.Label>Select a date</Form.Label>

                <br></br>
                <DatePicker
                    selected={
                        selectedDate
                    }
                    onChange={(date) => setSelectedDate(date)}

                    minDate={new Date()}
                    excludeDates={unavailableDates.map(date => new Date(date))}

                    required>
                
                
                
                </DatePicker>
            
            
            </Form.Group>

            <Button variant="primary" type="submit" className='mt-5'>
                Reserve
            </Button>
        
        </Form>) : (<h1>Inregistrati-va pentru a continua</h1>)}
        
    </Container>
)
};

export default ReservationForm;