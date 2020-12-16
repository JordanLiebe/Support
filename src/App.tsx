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
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';
import Login from './components/pages/Login';
import Logout from './components/pages/Logout';
import Register from './components/pages/Register';
import NotFound from './components/errors/NotFound';

function App() {
  const history = createBrowserHistory();
  return (
    <div className="App">
      <Authentication>
        <Router history={history}>
          <Header />
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route
              path="/Dashboard"
              render={() => (
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              )}
            />
            <Route
              path="/Issues"
              render={() => (
                <RequireAuth>
                  <IssueTable />
                </RequireAuth>
              )}
            />
            <Route path="/Login" render={() => <Login />} />
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
