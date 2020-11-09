import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import AboutProject from './pages/AboutProject';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SubmitComplaint from './partials/SubmitComplaint';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/about-project" component={AboutProject} />
          <Route exact path="/users/dashboard" component={Dashboard} />
          <Route exact path="/log-complaint" component={SubmitComplaint} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
