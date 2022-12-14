import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { MDBValidation, MDBValidationItem, MDBInput } from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';

import AuthContext from '../../../store/Auth/AuthContext';
import { login, setHeader } from '../../../api/http';
import Modal from '../../UI/Modal';
import Loader from '../../UI/Loader';

const LoginForm = () => {
  const [loginInput, setLoginInput] = useState({
    username: '',
    password: '',
  });
  const [, setIsAuth] = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (e) => {
    if (e.target.checkValidity()) {
      setIsLoading(true);
      login(loginInput).then((response) => {
        setIsLoading(false);
        if (response.status === 200) {
          setHeader(response.data.token);
          setIsAuth(true);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.message,
          });
        }
      });
    }
  };

  const loginInputHandler = (e) => {
    setLoginInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <>
      {isLoading && <Modal children={<Loader />} />}
      <MDBValidation
        noValidate={true}
        className={`text-center mx-auto row row-cols-1 gy-3 gx-0 shadow-4 p-5`}
        onSubmit={submitHandler}
      >
        <h2>Login</h2>
        <MDBValidationItem
          feedback="Please input username"
          invalid
          className="col mb-2"
        >
          <MDBInput
            label="Username"
            name="username"
            value={loginInput.username}
            type="text"
            required
            onChange={loginInputHandler}
          />
        </MDBValidationItem>
        <MDBValidationItem
          feedback="Please enter a valid password (minimum length 8)"
          invalid
          className="col mb-2"
        >
          <MDBInput
            label="Password"
            name="password"
            value={loginInput.password}
            type="password"
            minLength={8}
            required
            onChange={loginInputHandler}
          />
        </MDBValidationItem>
        <button
          type="submit"
          className="btn-lg btn-success btn-block mb-4 border-0 fw-bold"
        >
          Login
        </button>
        <p className="small">
          Don't have an account?
          <Link to="/auth/register">
            <span className="text-success" role="button">
              Register here
            </span>
          </Link>
        </p>
      </MDBValidation>
    </>
  );
};

export default LoginForm;
