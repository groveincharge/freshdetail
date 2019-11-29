import React, {Component} from 'react';
//import './css/register.css';
import axios from 'axios';


  class Register extends Component {
    constructor(props) {
      super(props);
      this.state = {firstName: " ",
                    lastName: " ",
                    email: " ",
                    username: " ",
                    password: " "
                  };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      event.persist();
      this.setState(state => ({...state, [event.target.name]: event.target.value}));
    };

    handleSubmit(event) {
      alert('Your name was submitted: ' + this.state.firstName);
      event.preventDefault();
    fetch('/api/register', {
                               method: 'POST',
                              headers: {
                                 'Content-Type': 'application/json;charset=utf-8'
                                },
                                 body: JSON.stringify(this.state)
     })
      .then(user => {
      this.setState({
        firstName: " ",
        lastName: " ",
        email: " ",
        username: " ",
        password: " " 
      });
      })
      .catch(err => console.log(err));
    };
  
    render() {
      return (
             <div className="Register">
             <div className="RegisterId">
               <h1>Register Account</h1><br/>
               <p>Register for access and updates!</p><br/>
        <form onSubmit={this.handleSubmit}>
          <>
            First Name:
            <input type="text" name="firstName" value={this.state.firstName} 
            onChange={this.handleChange} required/>
          </>

          <>
            Last Name:
            <input type="text" name="lastName" value={this.state.lastName} 
            onChange={this.handleChange} required/>
          </><br/>

          <><br/>
            Email:
            <input type="text" name="email" value={this.state.email} 
            onChange={this.handleChange} required/>
          </><br/>

          <><br/>
           Username:
          <input type="text" name="username" value={this.state.username} 
          onChange={this.handleChange} required/>
          </><br/>

           <><br/>
            Password:
          <input type="text" name="password" value={this.state.password} 
          onChange={this.handleChange} required/>
          </><br/><br/>

          <input type="submit" value="Submit" />
        </form>
        </div>
        </div>
      );
    }
  }
 
export default Register;