import React, { FC, useState, useContext } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import AuthenticationContext from '../contexts/AuthenticationContext';
import { LoginResponse, CreateUser, User } from '../interfaces/authentication';
import '../css/Login.css';
import { useHistory } from 'react-router-dom';

const Register: FC = () => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [first_name, setFirst_name] = useState<string>('');
  const [middle_name, setMiddle_name] = useState<string>('');
  const [last_name, setLast_name] = useState<string>('');
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  const auth = useContext(AuthenticationContext);

  const registerUser = async () => {
    setLoading(true);
    let user: CreateUser = {
      login: login,
      password: password,
      email: email,
      first_Name: first_name,
      middle_Name: middle_name,
      last_Name: last_name,
    };
    let loginResp: User | undefined = await auth.register(user);
    setLoading(false);
  };

  return (
    <div className="Login-Page">
      <div className="Login-Container">
        <h2>Register</h2>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            registerUser();
          }}
        >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
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

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              value={first_name}
              onChange={(e) => {
                setFirst_name(e.currentTarget.value);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Middle Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Middle Name"
              value={middle_name}
              onChange={(e) => {
                setMiddle_name(e.currentTarget.value);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              value={last_name}
              onChange={(e) => {
                setLast_name(e.currentTarget.value);
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
};

export default Register;
