import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './components/nav';
import Home from './components/home';
import About from './components/about';
import Contact from './components/contact';
import Services from './components/service';
import Product from './components/product';
import Logout from './components/logout';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

function App() {
  return (
  	<Router>
    <div className="App">
     <Nav/>
      <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/product" component={Product} />
      <Route path="/service" component={Services} />
      <Route path="/logout" component={Logout} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
