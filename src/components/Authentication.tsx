import React, { FC, useEffect, useState } from 'react';
import AuthenticationContext from '../contexts/AuthenticationContext';

import { User, LoginResponse, CreateUser } from '../interfaces/authentication';

const Authentication: FC = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [jwt, setJwt] = useState<string>('');
  const [user, setUser] = useState<User>();
  const [requireMFA, setRequireMFA] = useState<boolean>(true);

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

      setLoggedIn(loginResponse.success);
      setJwt(loginResponse.jwt);
      setRequireMFA(loginResponse.requireMFA);

      console.log(loginResponse);

      return loginResponse;
    }

    return undefined;
  };

  const verifyToken = async (code: number, token: string) => {
    const authenticationUrl = process.env.REACT_APP_API_URL + '/Auth/Code';
    let response = await fetch(authenticationUrl, {
      method: 'POST',
      body: JSON.stringify({
        Code: code,
        Token: token,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((e) => console.error(e));

    if (response && response.status === 200) {
      let loginResponse: LoginResponse = await response.json();

      setLoggedIn(loginResponse.success);
      setJwt(loginResponse.jwt);
      setRequireMFA(loginResponse.requireMFA);

      console.log(loginResponse);

      return loginResponse;
    }

    return undefined;
  };

  const clearAuthentication = () => {
    setJwt('');
  };

  const registerUser = async (user: CreateUser) => {
    const authenticationUrl = process.env.REACT_APP_API_URL + '/Auth/Register';
    let response = await fetch(authenticationUrl, {
      method: 'POST',
      body: JSON.stringify({
        login: user.login,
        password: user.password,
        email: user.email,
        first_name: user.first_Name,
        middle_name: user.middle_Name,
        last_name: user.last_Name,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((e) => console.error(e));

    console.log(response);

    if (response && response.status === 200) {
      let loginResponse: User | undefined = await response.json();
      return loginResponse;
    }

    return undefined;
  };

  useEffect(() => {
    const getUser = async () => {
      const authenticationUrl = process.env.REACT_APP_API_URL + '/Auth/Me';
      if (requireMFA == false) {
        let response = await fetch(authenticationUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + jwt,
          },
        }).catch((e) => console.error(e));

        if (response && response.status === 200) {
          let userData: User = await response.json();
          setUser(userData);
          setLoggedIn(true);
        }
      }
    };
    if (!requireMFA) getUser();
  }, [loggedIn, jwt]);

  return (
    <AuthenticationContext.Provider
      value={{
        user: user,
        jwt: jwt,
        isLoggedIn: loggedIn,
        requireMFA: requireMFA,
        login: async (username: string, password: string) => {
          let response: LoginResponse | undefined = await authenticateUser(
            username,
            password,
          );
          return response;
        },
        verifyCode: async (code: number, token: string) => {
          let response: LoginResponse | undefined = await verifyToken(
            code,
            token,
          );
          return response;
        },
        logout: () => {
          clearAuthentication();
        },
        register: async (user: CreateUser) => {
          let response: User | undefined = await registerUser(user);
          return response;
        },
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default Authentication;
