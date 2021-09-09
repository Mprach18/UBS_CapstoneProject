import React, {Component} from 'react';
import {Link, BrowserRouter, Switch, Route, Router} from 'react-router-dom';
import 'antd/dist/antd.css';
import Dashboard from './Dashboard'
import AddSecurity from './AddSecurity';
import SecurityDetails from './SecurityDetails';
import Security from './Security';
import BalanceSummary from './BalanceSummary';
import GenerateReport from './GenerateReport';
function App() {
  return (
    
        <BrowserRouter>
          <div className="App">
         <Switch>
         <Route exact path="/GenerateReport" component={GenerateReport}>
            </Route>
            <Route exact path="/BalanceSummary" component={BalanceSummary}>
            </Route>
            <Route exact path="/SecurityDetails/Security" component={Security}>
            </Route>
            <Route exact path="/SecurityDetails" component={SecurityDetails}>
            </Route>
            <Route exact path="/AddSecurity" component={AddSecurity}>
            </Route>
            <Route exact path="/Dashboard" component={Dashboard}>
            </Route>
            <Route exact path="/" component={Dashboard}>
            </Route>
            </Switch>
          </div>
        </BrowserRouter>
    
  );
}

export default App;
