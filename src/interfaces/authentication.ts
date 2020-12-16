// Old Interfaces //
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

export interface CreateUser {
  login: string;
  password: string;
  email: string;
  first_Name: string;
  middle_Name: string;
  last_Name: string;
}

export interface LoginResponse {
  login: string;
  success: boolean;
  requireMFA: boolean;
  errors: string[];
  jwt: string;
}

// Request Interfaces //
export interface PostUser {
  login: string;
  password: string;
  email: string;
  first_Name: string;
  middle_Name: string;
  last_Name: string;
}

export interface GetUser {
  uuid: string;
  login: string;
  hash: string;
  first_Name: string;
  middle_Name: string;
  last_Name: string;
  created: Date;
  status: string;
}

export interface PostLogin {
  login: string;
  password: string;
}

export interface GetLoginResponse {
  login: string;
  success: boolean;
  requireMFA: boolean;
  errors: string[];
  jwt: string;
}

export interface PostCode {
  Code: number;
  JWT: string;
}

export interface GetCodeResponse {
  success: boolean;
  errors: string[];
  jwt: string;
}
