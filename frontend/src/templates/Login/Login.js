import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import login from '../../hooks/useAuth';

import AlisonLogo from '../../assets/AlisonLogo.png';
import HeadstartLogo from '../../assets/HeadstartLogo.png';

import './Login.css';

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginSubmit = () => {
    login({ username, password }).then((response) => {
      if (response.status === 200) {
        navigate('/dashboard');
      } else {
        setError(response.message);
      }
    });
  };

  return (
    <div className="login-app">
      <div>
        <header className="image-align">
          <img src={AlisonLogo} className="Alison-logo" alt="Alison Logo" />
          <img src={HeadstartLogo} className="Headstart-logo" alt="Headstart Logo" />
        </header>
      </div>

      <div className="Header-title">
        <h1 className="Headstart-h1">Alison Headstart Database</h1>
        <h2 className="Headstart-h2">Please login below</h2>
      </div>

      <div>
        <section id="entry-page">
          <form>
            <h2>LOGIN TO THE TOOL</h2>
            <fieldset>
              <legend>Log In</legend>
              <ul>
                <li>
                  <label htmlFor="username">
                    Username:
                    <input type="text" id="username" required value={username} onChange={(event) => setUsername(event.target.value)} />
                  </label>
                </li>
                <li>
                  <label htmlFor="password">
                    Password:
                    <input type="password" id="password" required value={password} onChange={(event) => setPassword(event.target.value)} />
                  </label>
                </li>
                <li className="login-error">
                  {error}
                </li>
              </ul>
            </fieldset>
            <button type="button" onClick={() => handleLoginSubmit()}>Login</button>
          </form>
        </section>
      </div>

    </div>
  );
}

export default Login;
