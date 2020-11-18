import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import BaseConverter from './BaseConverter'
import { PairConverter } from './PairConverter'
import './App.css';


const NotFound = () => {
  return <h2>404 Not Found</h2>;
}


function App() {
  return (
    <Router>
    <nav className="navbar navbar-expand-xl w-100 py-0 my-0">
        <div className="d-xl-flex flex-grow-1 px-2">
          <Link to="/" className="navbar-brand py-4">Currency Converter</Link>
          <div class="navbar-nav ml-auto my-auto">
              <Link to="/" className="mr-5">Base Converter</Link>
              <Link to="/convert/">Pair Converter</Link>
          </div>
        </div>
      </nav>
      <Switch>
        <Route path="/" exact component={BaseConverter} />
        <Route path="/convert/" component={PairConverter} />
        <Route component={NotFound} />
      </Switch>
      <div class="container-fluid">
      <div class="row justify-content-between">
        <small class="copy pt-2 ml-1">2020 Alexander Kostritsa</small><div class="icons pt-2 pb-5"><a href="https://www.facebook.com/alexander.kostritsa.75/" target="blank"><i class="pl-4 fab fa-facebook-f"></i></a><a href="https://www.instagram.com/alex.veloce/" target="blank"><i class=" pl-3 mr-1 fab fa-instagram"></i></a></div>
      </div>
    </div>
    </Router>
  );
}

export default App;
