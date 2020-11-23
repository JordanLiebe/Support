import React from 'react';
import { LoginResponse, User } from '../interfaces/authentication';

const AuthenticationContext = React.createContext({
  user: {} as User | undefined,
  jwt: '' as string,
  isLoggedIn: false as boolean,
  requireMFA: false as boolean,
  login: async (
    login: string,
    password: string,
  ): Promise<LoginResponse | undefined> => {
    return undefined;
  },
  verifyCode: async (
    code: number,
    token: string,
  ): Promise<LoginResponse | undefined> => {
    return undefined;
  },
  logout: () => {},
});

export default AuthenticationContext;
