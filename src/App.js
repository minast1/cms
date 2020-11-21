import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import AboutProject from './pages/AboutProject';
import Login from './forms/Login';
import Register from './forms/Register';
import Dashboard from './pages/Dashboard';
import SubmitComplaint from './forms/SubmitComplaint';
import Complaints from './partials/Complaints';
import PoliceStations from './partials/PoliceStations';
import SubmitFeedback from './forms/SubmitFeedback';
import ProfilePage from './partials/ProfilePage';
import Criminals from './pages/Criminals';
import CriminalRegistration from './forms/CriminalRegistration';

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
          <Route exact path="/me/complaints" component={Complaints} />
          <Route exact path="/me" component={ProfilePage} />
          <Route exact path="/police-stations" component={PoliceStations} />
          <Route exact path="/feedback" component={SubmitFeedback} />
          <Route exact path="/criminals" component={Criminals} />
          <Route exact path="/criminal-registration" component={CriminalRegistration} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
