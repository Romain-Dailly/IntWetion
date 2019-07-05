import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div>
      <div className="row">
        <div className="col">
          <h2>Sign in to Intwetion</h2>
          <p>Please enter your credentials to proceed.</p>

          <form>
            <label htmlFor="">Email address</label>
            <div>
              <input type="text" />
            </div>
            <div>
              <div />
              <label htmlFor="">Password</label>
              <button>Forgot password?</button>
              <div>
                <input type="text" />
              </div>
            </div>

            <div>
              <input type="submit" />
            </div>

            <div>
              <label>Dont’ have an account?</label>
              <a href="">Sign up</a>
            </div>
          </form>
        </div>
        <div className="col" />
      </div>
    </div>
  );
};

export default Login;
