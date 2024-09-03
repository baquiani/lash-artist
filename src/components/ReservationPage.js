import React from 'react';
import ReservationForm from './Reservations';
import {Container} from 'react-bootstrap'



function ReservationPage(){
    return(

        <Container fluid className="g-0 pb-5 text-center mt-4">
            <div>
            <h1>Programare</h1>
            <br></br>
            <ReservationForm className="text-bold"/>
            </div>
        </Container>
        
    );
}


export default ReservationPage;