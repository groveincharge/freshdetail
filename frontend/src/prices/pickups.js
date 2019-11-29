import React from 'react';
import MidPickup from '../images/exteriorPickup1.JPG';
import LargePickup from '../images/vehicle3.JPG';
import Minivan from '../images/vehicle3.JPG';
import './css/pickups.css';

let midSizepickup = MidPickup;
let lgPickup = LargePickup;
let minivan = Minivan;

const priceArray = [{type: midSizepickup,
	    interior: "$75.00",
	    exterior: "$75.00",
	    engine: "$50.00"
	},
	 {type: lgPickup,
	    interior: "$90.00",
	    exterior: "$90.00",
	    engine: "$50.00"
	},
	  {type: minivan,
	    interior: "$100.00",
	    exterior: "$100.00",
	    engine: "$50.00"
	}
];
function Pickups(req, res) { 
  
  return (
    <div className="Pickups">
        <div className="intro">
        
            <img src={priceArray[0].type} width="100%" height="100%" alt="car"/>
            <h2>Mid-Size Pick-UP</h2>
            <h3>Prices</h3>
            <span>Interior {priceArray[0].interior}</span><br/>
               <span>Exterior {priceArray[0].exterior}</span><br/>
               <span>Engine {priceArray[0].engine}</span>
        </div>
         <div className="intro"> 
            
            <img src={priceArray[1].type} width="100%" height="100%" alt="car"/>
            <h2>Full-Size Pick-UP</h2>
             <h3>Prices</h3>
            <span>Interior {priceArray[1].interior}</span><br/>
             <span>Exterior {priceArray[1].exterior}</span><br/> 
             <span>Engine {priceArray[1].engine}</span><br/>
        </div>
         <div className="intro"> 
            
        <img src={priceArray[2].type} width="100%" height="100%" alt="open hood"/>
            <h2>Minivan</h2>
             <h3>Prices</h3>
            <span>Interior {priceArray[2].interior}</span><br/> 
            <span>Exterior {priceArray[2].exterior}</span><br/>
            <span>Engine {priceArray[2].engine}</span><br/>
        </div> 
    </div>
  );
};

export default Pickups;