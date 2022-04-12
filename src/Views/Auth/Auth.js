import React from 'react';
import { useState } from 'react';
import { signInUser, signUpUser } from '../../services/user';
import { useUserContext } from '../../Context/UserContext';
import { useHistory } from 'react-router-dom';
export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('signin');
  const [errorMessage, setErrorMessage] = useState('');

  const { setCurrentUser } = useUserContext();
  
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email || !password) return;
    try {
      const user =
        type === 'signin' ? await signInUser(email, password) : await signUpUser(email, password);
      setCurrentUser(user.email);
      history.push('/');
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
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
}
