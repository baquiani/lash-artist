
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white p-5 mt-auto text-center py-3">
      <Container>
        <Row>
          <Col>
            &copy; 2024 My Website. All Rights Reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
