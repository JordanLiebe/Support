import React, { FC, useState, useContext } from 'react';
import { Form, Spinner, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthenticationContext from '../../contexts/AuthenticationContext';
import { GetLoginResponse } from '../../interfaces/Authentication';

const Login: FC = () => {
  const auth = useContext(AuthenticationContext);
  // Current form Stage //
  const [stage, setStage] = useState<'LOGIN' | 'VERIFY' | 'DONE'>('LOGIN');
  // Login Form State //
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // Verification State //
  const [codeField, setCodeField] = useState<string>('');
  const [code, setCode] = useState<number>(0);
  // Global Form State //
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // Login Function //
  const pushLoginProcess = () => {
    const loginAsync = async () => {
      let response: GetLoginResponse | undefined = await auth.login(
        login,
        password,
      );
      if (response?.success) setStage('VERIFY');
    };
    const verifyCode = async () => {
      let token = auth.jwt;
      let response = await auth.verifyCode(code, token);
      if (response?.success) setStage('DONE');
    };
    switch (stage) {
      case 'LOGIN':
        loginAsync();
        break;
      case 'VERIFY':
        verifyCode();
        break;
      case 'DONE':
        verifyCode();
        break;
    }
  };

  switch (stage) {
    case 'LOGIN':
      return (
        <div className="Login-Page">
          <div className="Login-Container">
            <h2>Login</h2>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                pushLoginProcess();
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
                {formErrors &&
                  formErrors.map((error, i) => <div key={i}>{error}</div>)}
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
    case 'VERIFY':
      return (
        <div className="Login-Page">
          <div className="Login-Container">
            <h2>Verification</h2>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                pushLoginProcess();
              }}
            >
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Enter Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter 6 Digit Code"
                  value={codeField}
                  onChange={(e) => {
                    const re = /^[0-9\b]{0,6}$/;
                    if (re.test(e.currentTarget.value)) {
                      setCodeField(e.currentTarget.value);
                      var num = parseInt(e.currentTarget.value);
                      setCode(num);
                    } else {
                      setCode(0);
                    }
                  }}
                />
              </Form.Group>

              <Form.Text className="Text-Alert">
                {formErrors &&
                  formErrors.map((error, i) => <div key={i}>{error}</div>)}
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
    case 'DONE':
      return (
        <div className="Login-Page">
          <div className="Login-Container">
            <h2>Login Successful</h2>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Form.Group controlId="formBasicEmail">
                <br />
                <Link to="/Dashboard" className="btn btn-primary">
                  To Dashboard
                </Link>
              </Form.Group>
            </Form>
          </div>
        </div>
      );
  }
};

export default Login;
