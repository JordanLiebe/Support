import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { RouteComponentProps } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import { IssueTable } from './components/IssueTables';
import Authentication from './components/Authentication';
import RequireAuth from './components/RequireAuth';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import MFA from './components/MFA';
import Logout from './components/Logout';
import Register from './components/Register';
import NotFound from './components/errors/NotFound';

function App() {
  const history = createBrowserHistory();
  return (
    <div className="App">
      <Authentication>
        <Router history={history}>
          <Header />
          <Switch>
            <Route exact path="/" render={() => <Dashboard />} />
            <Route
              path="/Issues"
              render={() => (
                <RequireAuth>
                  <IssueTable />
                </RequireAuth>
              )}
            />
            <Route path="/Login" render={() => <Login />} />
            <Route path="/MFA" render={() => <MFA />} />
            <Route
              path="/Logout"
              render={() => (
                <RequireAuth>
                  <Logout />
                </RequireAuth>
              )}
            />
            <Route path="/Register" render={() => <Register />} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Authentication>
    </div>
  );
}

export default App;
