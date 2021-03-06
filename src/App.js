import React from 'react';
import { Route, Switch } from "react-router-dom";
import Navbar from './components/Navbar/Navbar.js';
import Footer from './components/Footer/Footer.js';
import Home from './views/Home/Home.js';
import CoinsIndex from './views/CoinsIndex/CoinsIndex.js';
import CoinsShow from './views/CoinsShow/CoinsShow.js';
import SignUp from './views/SignUp/SignUp.js';
import SignIn from './views/SignIn/SignIn.js';
import Dashboard from './views/Dashboard/Dashboard.js';
import EditAccount from './views/EditAccount/EditAccount.js'
import NoMatch from './views/NoMatch/NoMatch.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/coins" component={CoinsIndex} />
          <Route exact path="/coins/:coin_id" component={CoinsShow} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={SignIn} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/account" component={EditAccount} />
          <Route component={NoMatch} />
        </Switch>
      <Footer />
    </div>
  );
}

export default App;
