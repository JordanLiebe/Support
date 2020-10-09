import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import IssueTable from './components/IssueTable';

function App() {
  return (
    <div className="App">
      <Header />
      <IssueTable />
    </div>
  );
}

export default App;
