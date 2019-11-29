import React from 'react';
import Smallcar from '../images/exteriorCar2.JPG';
import Midsizecar from '../images/vehicle2.JPG';
import Largecar from '../images/vehicle3.JPG';
import Description from './description';
import './css/cars.css';

const smCar = Smallcar;
const midCar = Midsizecar;
const lgCar = Largecar;

let priceArray = [{type: smCar,
	    interior: "$50.00",
	    exterior: "$50.00",
	    engine: "$50.00"
	},
	 {type: midCar,
	    interior: "$65.00",
	    exterior: "$65.00",
	    engine: "$50.00"
	},
	  {type: lgCar,
	    interior: "$75.00",
	    exterior: "$75.00",
	    engine: "$50.00"
	}
];
function Cars(req, res) { 
  
   const description = Description;
  return (
    <div className="Cars">
        <div className="intro">
		  <h3>Interior Work List</h3>
		   <span>{description[0].description}</span><br/>

            <img className="cartag" src={priceArray[0].type} width="100%" height="100%" alt="car"/>
			<h2>Small Cars</h2> 
            <h3>Prices</h3>
            <span>Interior {priceArray[0].interior}</span><br/>
               <span>Exterior {priceArray[0].exterior}</span><br/>
               <span>Engine {priceArray[0].engine}</span>
        </div>
         <div className="intro"> 
			<h3>Exterior Work List</h3>
			<span>{description[1].description}</span><br/>
            <img src={priceArray[1].type} width="100%" height="100%" alt="car"/>
			<h2>Mid-Size Cars</h2>
             <h3>Prices</h3>
            <span>Interior {priceArray[1].interior}</span><br/>
             <span>Exterior {priceArray[1].exterior}</span><br/> 
             <span>Engine {priceArray[1].engine}</span><br/>
        </div>
         <div className="intro"> 
            
			<h3>Engine Work List</h3>
			<span>{description[2].description}</span><br/>
        <img src={priceArray[0].type} width="100%" height="100%" alt="open hood"/>
		    <h2>Large Cars</h2>
             <h3>Prices</h3>
            <span>Interior {priceArray[2].interior}</span><br/> 
            <span>Exterior {priceArray[2].exterior}</span><br/>
            <span>Engine {priceArray[2].engine}</span><br/>
        </div> 
    </div>
  );
};

export default Cars;