import React from 'react';
import { Route, Switch } from "react-router-dom";
import Navbar from './components/Navbar/Navbar.js';
import Footer from './components/Footer/Footer.js';
import Home from './views/Home/Home.js';
import NoMatch from './views/NoMatch/NoMatch.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route path="/about" component={About} /> */}
          <Route component={NoMatch} />
        </Switch>
      <Footer />
    </div>
  );
}

export default App;
