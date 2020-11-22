import React, { FC, useContext } from 'react';
import AuthenticationContext from '../contexts/AuthenticationContext';
import Unauthorized from './errors/Unauthorized';

const RequireAuth: FC = ({ children }) => {
  const auth = useContext(AuthenticationContext);

  if (auth.isLoggedIn) return <div>{children}</div>;
  else return <Unauthorized />;
};

export default RequireAuth;
