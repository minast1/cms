import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainNav from './components/MainNav';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import AboutProject from './pages/AboutProject';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about-project" component={AboutProject} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
