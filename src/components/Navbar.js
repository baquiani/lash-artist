import React, {useState, useEffect} from 'react';
import { Navbar, Nav, Container,Button } from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom'
import icon from '../images/icon.svg'

const Navigation = () => {

  const [isLoggedIn, setIsLoggedIn] = useState((false));
  const navigate = useNavigate();

  useEffect(() =>{
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
    window.location.reload();
  }
  return (
    <Navbar bg="white" variant="light" expand="lg" className='mb-1 text-white border-bottom border-dark'>
      
        <Navbar.Brand as={Link} to="/">
          <img src={icon} width="250" height="50" className='d-inline-block align-top' alt="logo" />
          
          

        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" variant="outline-dark"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
          <Button as={Link} to ="/" variant="outline-light" className='text-dark'>Home</Button>
            

            <Button as={Link} to ="/programare" variant="outline-light" className='text-dark'>Rezervare</Button>

            <Button as={Link} to ="/inregistrare" variant = "outline-light" className='text-dark'>Inregistrare</Button>
            {isLoggedIn ? (<Button as={Link} variant="outline-light" className='text-dark' onClick={handleLogout}>Logout</Button>) : (<Button as={Link} to ="/login" variant = "outline-light" className='text-dark'>Login</Button>)}
            
          </Nav>
        </Navbar.Collapse>
      
    </Navbar>
  );
}

export default Navigation;
