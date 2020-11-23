import React, { FC, useContext } from 'react';
import AuthenticationContext from '../contexts/AuthenticationContext';
import { useHistory } from 'react-router-dom';
import { LoginResponse } from '../interfaces/authentication';
import '../css/Login.css';

const Logout: FC = () => {
  const history = useHistory();
  const auth = useContext(AuthenticationContext);

  auth.logout();
  history.push('/');

  return (
    <div className="Login-Page">
      <div className="Login-Container">
        <h2>Logging Out...</h2>
      </div>
    </div>
  );
};

export default Logout;
