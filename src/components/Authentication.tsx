import React, { FC, useEffect, useState } from 'react';
import AuthenticationContext from '../contexts/AuthenticationContext';
import {
  getUser,
  loginUser,
  verifySession,
} from '../api-connections/Authentication';
import {
  User,
  LoginResponse,
  CreateUser,
  GetCodeResponse,
  GetLoginResponse,
  GetUser,
} from '../interfaces/Authentication';
import { report } from 'process';

const Authentication: FC = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [jwt, setJwt] = useState<string>('');
  const [user, setUser] = useState<User>();

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
    const getUserAsync = async () => {
      let user: GetUser | undefined = await getUser(jwt);
      setUser(user);
    };
    if (loggedIn) getUserAsync();
  }, [loggedIn]);

  return (
    <AuthenticationContext.Provider
      value={{
        user: user,
        jwt: jwt,
        isLoggedIn: loggedIn,
        login: async (username: string, password: string) => {
          let response: GetLoginResponse | undefined = await loginUser(
            username,
            password,
          );
          if (response && response.success) setJwt(response.jwt);
          return response;
        },
        verifyCode: async (code: number, token: string) => {
          let response: GetCodeResponse | undefined = await verifySession(
            code,
            token,
          );
          setLoggedIn(true);
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
