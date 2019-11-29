import React from 'react';
import Cars from './../prices/cars';
import Suvs from './../prices/suvs';
import Pickups from './../prices/pickups';


function Services(req, res) { 
  
  return (
    <div className="Services">
     <Cars/>
     <Suvs/>
     <Pickups/>
    </div>
  );
};

export default Services;