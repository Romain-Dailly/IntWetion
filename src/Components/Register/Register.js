import React from 'react';
import './Register.css';

const Register = () => (
  <form>
    <form className="row">
      <form className="col">
        <h2>Create your free account</h2>

        <form>
          <div>
            <label htmlFor="">Full Name</label>
            <div>
              <input type="text" />
            </div>
          </div>
          <div>
            <label htmlFor="">Email address</label>
            <div>
              <input type="text" />
            </div>
          </div>
          <div>
            <label htmlFor="">Password</label>
            <div>
              <input type="text" />
            </div>
          </div>
          <label>
              By signing up, you agree to our
            <a href=""> Terms of Service</a>
          </label>

          <div>
            <input type="submit" />
          </div>
          <div>
            <label>
                Already have an account?
              <a href=""> Sign in</a>
            </label>
          </div>
        </form>
      </form>
      <div className="col" />
    </form>
  </form>
);

export default Register;
