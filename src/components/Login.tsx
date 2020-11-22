import React, { FC, useState, useContext, useEffect } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import AuthenticationContext from '../contexts/AuthenticationContext';
import { LoginResponse } from '../interfaces/authentication';
import '../css/Login.css';
import { useHistory } from 'react-router-dom';

const Login: FC = () => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginErrors, setLoginErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  const auth = useContext(AuthenticationContext);

  const authenticate = async () => {
    setLoading(true);
    let loginResp: LoginResponse | undefined = await auth.login(
      login,
      password,
    );
    setLoading(false);
    if (loginResp) {
      if (loginResp.success) {
        history.push('/');
      } else {
        setLoginErrors(loginResp.errors);
      }
    }
  };

  return (
    <div className="Login-Page">
      <div className="Login-Container">
        <h2>Login</h2>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            authenticate();
          }}
        >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              value={login}
              onChange={(e) => {
                setLogin(e.currentTarget.value);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
            />
          </Form.Group>

          <Form.Text className="Text-Alert">
            {loginErrors && loginErrors.map((error) => <div>{error}</div>)}
          </Form.Text>

          {loading ? (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            <Button variant="primary" type="submit">
              Submit
            </Button>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Login;
