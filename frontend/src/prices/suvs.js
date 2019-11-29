import React from 'react';
import SmallSuv from '../images/vehicle3.JPG';
import MidSuv from '../images/e.JPG';
import LargeSuv from '../images/vehicle5.JPG';
import './css/suvs.css';

let smSuv = SmallSuv;
let midSuv = MidSuv;
let lgSuv = LargeSuv;

const priceArray = [{type: smSuv,
	    interior: "$65.00",
	    exterior: "$65.00",
	    engine: "$50.00"
	},
	 {type: midSuv,
	    interior: "$75.00",
	    exterior: "$75.00",
	    engine: "$50.00"
	},
	  {type: lgSuv,
	    interior: "$90.00",
	    exterior: "$90.00",
	    engine: "$50.00"
	}
];
function Suvs(req, res) { 
  
  return (
    <div className="Suvs">
        <div className="suvtag">
        
            <img src={priceArray[0].type} width="100%" height="100%" alt="car"/>
            <h2>Small Suvs</h2>
            <h3>Prices</h3>
            <span>Interior {priceArray[0].interior}</span><br/>
               <span>Exterior {priceArray[0].exterior}</span><br/>
               <span>Engine {priceArray[0].engine}</span>
        </div>
         <div className="suvtag"> 
            
            <img src={priceArray[1].type} width="100%" height="100%" alt="car"/>
            <h2>Mid-Size Suvs</h2>   
             <h3>Prices</h3>
            <span>Interior {priceArray[1].interior}</span><br/>
             <span>Exterior {priceArray[1].exterior}</span><br/> 
             <span>Engine {priceArray[1].engine}</span><br/>
        </div>
         <div className="suvtag"> 
            
        <img src={priceArray[2].type} width="100%" height="100%" alt="open hood"/>
            <h2>Large Suvs</h2>
             <h3>Prices</h3>
            <span>Interior {priceArray[2].interior}</span><br/> 
            <span>Exterior {priceArray[2].exterior}</span><br/>
            <span>Engine {priceArray[2].engine}</span><br/>
        </div> 
    </div>
  );
};

export default Suvs;