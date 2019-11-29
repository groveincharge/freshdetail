import React, {useState, useEffect} from 'react';

const Logout = (props) => {

    const [state, setState] = useState({
       authUser: false,
          user: {}
        })

  useEffect(() => {
    fetch('/api/logout', {
        method: 'GET',
        headers: {
             'Content-Type':'application/json'
               },
  })
   .then(result => {
    setState({
          authUser: false,
          user: result.data 
    })
   })
   .catch({
    message: 'User Not Logged Out'
   })
     },[]);
   

    return ( 
        <div>
            <h1>You Have Successfully logged out.</h1>
             <p>logged out user {}</p>
        </div>
     );
}
 
export default Logout;