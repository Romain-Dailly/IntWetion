import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import { Form, Input } from 'antd';

const { Item } = Form;

const Register = () => (
  <div className="container px-3 h-100">
    <div className="center-content">
      <Form className="login-form">
        <div className="mb-5">
          <h2 className="header-2 text-center m-0">Create your free account</h2>
        </div>
        <Item label="Full Name" className="form-label">
          <Input type="text" className="ui-input" />
        </Item>
        <Item label="Email address" className="form-label">
          <Input type="text" className="ui-input" />
        </Item>

        <Item label="Password" className="form-label">
          <Input type="password" className="ui-input" />
        </Item>

        <button
          type="button"
          htmlType="submit"
          style={{ height: '40px' }}
          className="button button-primary  w-100 mb-3"
        >
          Create Account
        </button>
        <div>
          Already have an account?
          {' '}
          <Link to="/login">Sign in</Link>
        </div>
      </Form>
    </div>
  </div>
);
export default Register;
