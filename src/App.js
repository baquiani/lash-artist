import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import Reservations from './components/Reservations'
import ReservationPage from './components/ReservationPage';
import Registration from './components/Registration'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import RegistrationPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';


function App() {
  return (
    <div>
      <Router>
        <Navbar />

        <Routes>
          <Route path='/' element={<HeroSection/>} />

          <Route path="/programare" element={<ReservationPage/>}/>

          <Route path="/inregistrare" element={<RegistrationPage/>}/>

          <Route path="/login" element={<LoginPage/>}/>
        </Routes>

      </Router>
      

      <Footer />
      
      
    </div>
  );
}

export default App;
