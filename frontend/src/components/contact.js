import React, {Component} from 'react';
import './css/contact.css';


  class Contact extends Component {
    constructor(props) {
      super(props);
      this.state = {firstName: " ",
                    lastName: " ",
                    email: " ",
                    info: " "
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

       fetch('/api/contact',{
                   method: 'POST',
                   headers: {
                      'Accept': 'application/json, text/plain, */*',
                      'Content-Type': 'application/json'
                                        },
                     body: JSON.stringify(this.state)
      })
      .then(contact => {
        this.setState({
            firstName: " ",
            lastName: " ",
            email: " ",
            info: " "
        });
      })
      .catch(err => console.log(err)); 
    };
  
    render() {
      return (
             <div className="ContactForm">
                 <div className="ContactIntro">
                 <h1>Contact Us</h1><br/>
                 <p>Contact us about any issues that
                     concerns you. We are dedicated to
                     providing a quality service to our
                     customers. The infomation that you
                     provide is kept confidential and shared
                     with no other party. The information is
                     used for personal transactions and customers
                     identification only. We are an Auto Detail company.
                     So feel free to contact us about your
                     auto detailing issues. NAD will respond to all
                     issues in a timely manner. Customers using the
                     affliliate link should register with NAD. This
                     will help us with identification on resolving
                     any issues that might pop up later. We can resolve 
                     problems in a more efficient manner with proper
                     documentation.
                 </p>
             </div>
               <div className="FormId">
               <h1>Contact Form</h1><br/>
               <p>Customer Comments</p><br/>
        <form onSubmit={this.handleSubmit}>
          <>
            First Name:
            <input type="text" name="firstName" value={this.state.firstName} 
            onChange={this.handleChange} required/>
          </><br/>

          <><br/>
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
            comments:
          <textarea type="text" name="info" value={this.state.info} 
          onChange={this.handleChange} required/>
          </><br/><br/>

          <input type="submit" value="Submit" />
        </form>
        </div>
        </div>
      );
    }
  }
 
export default Contact;