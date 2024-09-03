import React from 'react';
import { Container, Card, Row,Col, CardGroup,Image} from 'react-bootstrap';
import image1 from '../images/img1.jpg';
import image2 from '../images/img2.jpg';
import banner from '../images/logo3.jpg'

const HeroSection = () => {
  return (
    <Container fluid style={{  background: 'white' }}>
   
   <Row>

    <Col className='bg-white m'>
    
    </Col>
   </Row>
    <Row className='g-0 mt-5 pt-5 align-items-center'>
        
      <Col className='border-end border-dark'>
      <Card style={{width:'38rem'}}>
        <Card.Img variant="bottom" src={image1}/>
        
      </Card>
      </Col>  
        
      <Col className='text-dark text-left text-bold p-5'>
      
      <h1 className='fw-bold'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.</h1>
      
      </Col>

        
       

        
    </Row>
    <br></br>

    <Row>
      
    </Row>
    
    </Container>
    
  );
}

export default HeroSection;
