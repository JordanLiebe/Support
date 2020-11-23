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
              exact
              render={() => (
                <RequireAuth>
                  <IssueTable />
                </RequireAuth>
              )}
            />
            <Route path="/Login" exact render={() => <Login />} />
            <Route path="/MFA" exact render={() => <MFA />} />
            <Route path="/Logout" exact render={() => <Logout />} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Authentication>
    </div>
  );
}

export default App;
