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
import SubmitFeedback from './forms/SubmitFeedback';
import ProfilePage from './partials/ProfilePage';
import Criminals from './pages/Criminals';
import CriminalRegistration from './forms/CriminalRegistration';
import RegisterPolice from './forms/RegisterPolice';
import AddCourtType from './forms/AddCourtType';
import AddArticleBook from './forms/AddArticleBook';
import ChangePassword from './forms/ChangePassword';
import AddCourt from './forms/AddCourt';
import AddCrimeCategory from './forms/AddCrimeCategory';
import CriminalDetails from './pages/CiminalDetails';
import ViewArticleBooks from './pages/ViewArticleBooks';
import ViewPoliceStations from './pages/ViewPoliceStations';
import AddPoliceStation from './forms/AddPoliceStation';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
         
          <Route exact path="/users/dashboard" component={Dashboard} />
          <Route exact path="/log-complaint" component={SubmitComplaint} />
          <Route exact path="/me/complaints" component={Complaints} />
          <Route exact path="/me" component={ProfilePage} />
          <Route exact path="/resident/police-stations" component={ViewPoliceStations} />
          <Route exact path="/police/police-stations/add" component={AddPoliceStation} />
          <Route exact path="/feedback" component={SubmitFeedback} />
          <Route exact path="/criminals" component={Criminals} />
          <Route exact path="/police/criminals/registration" component={CriminalRegistration} />
          <Route exact path="/admin/police-officers/registration" component={RegisterPolice} />
          <Route exact path="/admin/court-types/add" component={AddCourtType} />
          <Route exact path="/police/article-books/add" component={AddArticleBook} />
          <Route exact path="/me/change-password" component={ChangePassword} />
          <Route exact path="/admin/courts/add" component={AddCourt} />
          <Route exact path="/police/crime-categories/add" component={AddCrimeCategory} />
          <Route exact path="/criminals/:id" component={CriminalDetails} /> 
          <Route exact path="/resident/article-books" component={ViewArticleBooks} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
