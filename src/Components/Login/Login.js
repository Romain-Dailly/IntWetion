import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from 'antd';
import './Login.css';

const { Item } = Form;

const Login = () => (
  <div className="container px-3 h-100">
    <div className="center-content">
      <Form className="login-form">
        <div className="mb-5">
          <h2 className="header-2 text-center m-0 mb-1">
            Sign in to Intwetion
          </h2>
          <p className="caption text-center">
            Please enter your credentials to proceed.
          </p>
        </div>
        <Item label="Email address" className="form-label">
          <Input type="text" className="ui-input" />
        </Item>
        <Item label="Password" className="form-label">
          <Input type="password" className="ui-input" />
        </Item>

        <button
          htmlType="submit"
          style={{ height: '40px' }}
          className="button button-primary  w-100 mb-3"
        >
          Log in
        </button>
        <div>
          Dont’ have an account?
          {' '}
          <Link to="/register">register now!</Link>
        </div>
      </Form>
    </div>
  </div>
);

export default Login;
