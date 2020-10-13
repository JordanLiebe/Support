import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import { FilteredIssueTable } from './components/IssueTables';

function App() {
  return (
    <div className="App">
      <Header />
      <FilteredIssueTable />
    </div>
  );
}

export default App;
