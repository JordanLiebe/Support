import React from 'react';
import {
  PostUser,
  GetUser,
  GetLoginResponse,
  GetCodeResponse,
} from '../interfaces/Authentication';

const ApiAuthController = process.env.REACT_APP_API_URL + '/Auth';

export const loginUser = async (username: string, pass: string) => {
  const authenticationUrl = ApiAuthController + '/Login';
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
    let loginResponse: GetLoginResponse = await response.json();
    return loginResponse;
  }

  return undefined;
};

export const verifySession = async (code: number, jwt: string) => {
  const authenticationUrl = ApiAuthController + '/Code';
  let response = await fetch(authenticationUrl, {
    method: 'POST',
    body: JSON.stringify({
      code: code,
      token: jwt,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch((e) => console.error(e));

  if (response && response.status === 200) {
    let loginResponse: GetCodeResponse = await response.json();
    return loginResponse;
  }

  return undefined;
};

export const getUser = async (jwt: string) => {
  const authenticationUrl = ApiAuthController + '/Me';
  let response = await fetch(authenticationUrl, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + jwt,
      'Content-Type': 'application/json',
    },
  }).catch((e) => console.error(e));

  if (response && response.status === 200) {
    let userResponse: GetUser = await response.json();
    return userResponse;
  }

  return undefined;
};
