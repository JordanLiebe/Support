import React, { FC, useContext } from 'react';
import AuthenticationContext from '../contexts/AuthenticationContext';
import { useHistory } from 'react-router-dom';
import { LoginResponse } from '../interfaces/authentication';
import '../css/Login.css';

const Login: FC = () => {
  const history = useHistory();
  const auth = useContext(AuthenticationContext);

  const authenticateUser = async (username: string, pass: string) => {
    const authenticationUrl = process.env.REACT_APP_API_URL + '/Auth/Login';
    let response = await fetch(authenticationUrl, {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: pass,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((e) => console.error(e));

    if (response && response.status === 200) {
      let loginResponse: LoginResponse = await response.json();

      return loginResponse;
    }

    return undefined;
  };

  return (
    <div className="Login-Page">
      <div className="Login-Container">
        <h2>Logging Out...</h2>
      </div>
    </div>
  );
};

export default Login;
