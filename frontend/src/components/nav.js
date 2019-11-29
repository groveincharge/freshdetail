import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import './css/nav.css';

function Nav() {
  return (
    <nav className='menu-nav'>
    <h3>NAD</h3>
       <div className='spacer'/>
      <ul className= 'nav-links' > 
      <Link to='/'>
        <li>Home</li>
        </Link>

        <Link to='/about'>
        <li>About</li>
        </Link>
       
       <Link to='/contact'>
        <li>Contact</li>
        </Link> 
       
       <Link to='/product'>
        <li>Product</li>
        </Link>

         <Link to='/service'>
        <li>Services</li>
        </Link>

        <Link to='/logout'>
        <li>logout</li>
        </Link>
        
      </ul>
    </nav>
  );
}

export default Nav;