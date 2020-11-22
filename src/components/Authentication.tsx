import React, { FC, useEffect, useState } from 'react';
import AuthenticationContext from '../contexts/AuthenticationContext';

import { User, LoginResponse } from '../interfaces/authentication';

const Authentication: FC = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [jwt, setJwt] = useState<string>('');
  const [user, setUser] = useState<User>();

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

      return loginResponse;
    }

    return undefined;
  };

  const clearAuthentication = () => {
    setJwt('');
  };

  useEffect(() => {
    const getUser = async () => {
      const authenticationUrl = process.env.REACT_APP_API_URL + '/Auth/Test';
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
    };
    if (jwt !== '') getUser();
    else {
      setUser(undefined);
      setLoggedIn(false);
    }
  }, [jwt]);

  return (
    <AuthenticationContext.Provider
      value={{
        user: user,
        jwt: jwt,
        isLoggedIn: loggedIn,
        login: async (username: string, password: string) => {
          let response: LoginResponse | undefined = await authenticateUser(
            username,
            password,
          );
          return response;
        },
        logout: () => {
          clearAuthentication();
        },
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default Authentication;
