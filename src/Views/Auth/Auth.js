import React from 'react';
import { useState } from 'react';

export default function Auth(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('signup');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email || !password) return;
    try {
      const user =
        type === 'signin' ? await signInUser(email, password) : await signupUser(email, password);
      props.setCurrentUser(user.email);
    } catch (e) {
      e.message ? setErrorMessage(e.message) : setErrorMessage('Unable to sign in. Try again');
    }
  };

  return (
    <div className="auth">
      <span className={type === 'signin' ? 'active' : ''} onClick={() => setType('signin')}>
        Sign In
      </span>
      <span className={type === 'signup' ? 'active' : ''} onClick={() => setType('signup')}>
        Sign Up
      </span>
      <div className="error-message">{errorMessage}</div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          email:
          <input type="email" value={email} onSubmit={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          password:
          <input type="password" value={password} onSubmit={(e) => setPassword(e.target.value)} />
        </label>
      </form>
    </div>
  );
}
