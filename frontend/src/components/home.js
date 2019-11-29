import React from 'react';
import './css/home.css';
//import InteriorDetail from '../images/interiorPickup4.JPG';
//import ExteriorDetail from '../images/vehicle1.JPG';
//import EngineClean from '../images/engineclean.JPG';
import Register from './register';
import Login from './login';
import {Link} from 'react-router-dom';
import {Jumbotron, Container, Row, Col, Image, Button} from 'react-bootstrap';

const Home = () => {
  return ( 
    <div className="Home">
      <Container>
        <Jumbotron>
          <h1>Welcome to Norfolk Auto Detail</h1>
          <h2>(757) 581-9156</h2>
          <p>Norfolkautodetail.com is the place to come to for
            all of your Auto detail needs, from products to services.
             Quality is the core motto of our organization, we are available 
             to our customers year round.
          </p>
          <Link to="/products">
          <Button bsstyle="primary">About</Button>
        </Link>
        </Jumbotron>
        <div className="Register">
         <Register/>
         <Login/>
        </div>
        </Container>
        </div>
           );
};
 
export default Home;