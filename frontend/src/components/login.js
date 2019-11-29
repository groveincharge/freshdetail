import React, {Component} from 'react';
//import './css/login.css';
//import axios from 'axios';


  class Login extends Component {
    constructor(props) {
      super(props);
      this.state = { email: " ",
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
      alert('Your email was submitted: ' + this.state.email);
      event.preventDefault();
       fetch('/api/login', {
                     method: 'POST',
                     headers: {
                          'Content-Type':'application/json'
                            },
                     body: JSON.stringify(this.state)
            })
             .then(res => {
                     this.setState({
                             email: " ",
                             username: " ",
                             password: " " 
                           })
                          })
                           .catch(err => console.log(err)); 
                };
  
    render() {
      return (
             <div className="Sign-inId">
               <h1>Login</h1><br/>
        <form onSubmit={this.handleSubmit}>
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

          <input type="submit" value="Submit"/>
        </form>
        </div>
      );
    }
  }
 
export default Login;