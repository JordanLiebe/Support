import React from 'react';

export interface User {
  uuid: string;
  login: string;
  hash: string;
  first_Name: string;
  middle_Name: string;
  last_Name: string;
  created: Date;
  status: string;
}

export interface LoginResponse {
  login: string;
  success: boolean;
  requireMFA: boolean;
  errors: string[];
  jwt: string;
}
