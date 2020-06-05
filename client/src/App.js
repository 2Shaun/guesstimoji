import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./pages/home/home.page";
import GamePage from "./pages/game/game.page";
import Footer from "./footer"
import './index.css';


function App() {
  return (
    <Router>
      <div className="App" align= "center">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/game" component={GamePage} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;