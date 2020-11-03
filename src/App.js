import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Alert from 'components/alert/Alert';
import {AlertState} from 'context/alert/AlertState';
import Streamer from 'pages/streamer/Streamer';
import Dashboard from './pages/dashboard/DashBoard';
import Dev from './pages/Dev';


function App() {
  return (
    <AlertState>
      <Alert />
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Dashboard} />
            <Route path='/streamer' component={Streamer} />
            <Route path='/dev' component={Dev} />
          </Switch>
        </BrowserRouter>
      </div>
    </AlertState>
  )
};

export default App;