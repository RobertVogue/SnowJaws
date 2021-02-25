import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './Modal.css'

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };
  const handleDemoClick = e => {
    // e.preventDefault(); // no preventing default so we will login immediately
    setCredential('Demo');
    setPassword('password');
  }
  return (
    <div className='outerbest'>
        <div className='form'>
            <form onSubmit={handleSubmit}>
                <h2>Welcome Back to SnowJaws</h2>
                <div>
                    <label>
                    Username
                    </label>
                    <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                    />
                </div>
                <div>
                    <label>
                    Password
                    </label>
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </div>
                <div>
                <button type="submit">Log In</button>
                <button onClick={handleDemoClick}>Demo</button>
                </div>
                <div>
                    <ul>
                        {errors.map((error, idx) => (
                        <li className='error' key={idx}>{error}</li>
                        ))}
                    </ul>
                </div>
            </form>
        </div>
    </div>
  );
}

export default LoginForm;
