import React from 'react';
import {
  LoginResponse,
  CreateUser,
  User,
  GetCodeResponse,
  GetLoginResponse,
} from '../interfaces/Authentication';

const AuthenticationContext = React.createContext({
  user: {} as User | undefined,
  jwt: '' as string,
  isLoggedIn: false as boolean,
  login: async (
    login: string,
    password: string,
  ): Promise<GetLoginResponse | undefined> => {
    return undefined;
  },
  verifyCode: async (
    code: number,
    token: string,
  ): Promise<GetCodeResponse | undefined> => {
    return undefined;
  },
  logout: () => {},
  register: async (user: CreateUser): Promise<User | undefined> => {
    return undefined;
  },
});

export default AuthenticationContext;
