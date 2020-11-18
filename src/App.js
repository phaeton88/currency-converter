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
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/convert/">Convert</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/" exact component={BaseConverter} />
        <Route path="/convert/" component={PairConverter} />
        <Route component={NotFound} />
      </Switch>
      <div className="container-fluid">
      <div className="row justify-content-between">
        <small className="pt-2">2020 Alexander Kostritsa</small><div className="icons pt-2 pb-5"><a href="https://www.facebook.com/alexander.kostritsa.75/" target="blank"><i className="pl-4 fab fa-facebook-f"></i></a><a href="https://www.instagram.com/alex.veloce/" target="blank"><i className=" pl-3 fab fa-instagram"></i></a></div>
      </div>
    </div>
    </Router>
  );
}

export default App;
