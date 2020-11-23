import React, { FC, useState, useContext } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import AuthenticationContext from '../contexts/AuthenticationContext';
import { LoginResponse } from '../interfaces/authentication';
import '../css/Login.css';
import { useHistory } from 'react-router-dom';

const MFA: FC = () => {
  const [code, setCode] = useState<number>(0);
  const [codeField, setCodeField] = useState<string>('');
  const [loginErrors, setLoginErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  const auth = useContext(AuthenticationContext);

  const authenticate = async () => {
    setLoading(true);
    if (auth.isLoggedIn === false) history.push('/Login');
    let loginResp: LoginResponse | undefined = await auth.verifyCode(
      code,
      auth.jwt,
    );
    setLoading(false);
    if (loginResp) {
      if (loginResp.success && !loginResp.requireMFA) {
        history.push('/');
      } else {
        setLoginErrors(loginResp.errors);
      }
    }
  };

  return (
    <div className="Login-Page">
      <div className="Login-Container">
        <h2>Verification</h2>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            authenticate();
          }}
        >
          <Form.Group controlId="formBasicCode">
            <Form.Label>6 Digit Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Code"
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
            {loginErrors &&
              loginErrors.map((error, i) => <div key={i}>{error}</div>)}
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

export default MFA;
