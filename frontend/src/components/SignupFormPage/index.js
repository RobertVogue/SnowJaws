import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './sign.css'

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [admin, setAdmin] = useState(false);
  const handleClick = () => setAdmin(!admin);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, admin, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="back">
      <div> 
        <div className="front">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="box22">
                Email:
                </label>
                <input
                  className="box22"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
            </div>
            <div>
              <label className="box22">
                Username:
                </label>
                <input
                  className="box22"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
            </div>
            <div>
              <label className="box22">
                Admin:
                </label>
                <input
                  className="box22"
                  type="checkbox"
                  value={admin}
                  onChange={handleClick}
                />
            </div>
            <div>
              <label className="box22">
                Password:
                </label>
                <input
                  className="box22"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
            </div>
            <div>
              <label className="box22">
                Confirm Password:
                </label>
                <input
                  className="box22"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
            </div>
            <div>
              <button className="login_button1" type="submit">Sign Up</button>
            </div>
            <ul>
              {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
          </form>
      </div>
      </div>
    </div>
  );
}

export default SignupFormPage;
