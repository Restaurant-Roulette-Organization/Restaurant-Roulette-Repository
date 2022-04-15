import React from 'react';
import { useState } from 'react';
import {
  fetchProfileData,
  getUser,
  insertProfileData,
  signInUser,
  signUpUser,
} from '../../services/user';
import { useUserContext } from '../../Context/UserContext';
import { useHistory } from 'react-router-dom';
import './Auth.css';
export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('signin');
  const [errorMessage, setErrorMessage] = useState('');

  const { setCurrentUser, userName, setUserName, setProfile } = useUserContext();

  const history = useHistory();

  const handleSignup = async () => {
    const user = await signUpUser(email, password);
    const profileData = await insertProfileData(userName, user.id);
    setProfile(profileData[0]);
    setUserName('');
  };

  const handleSignIn = async () => {
    await signInUser(email, password);
    const profileData = await fetchProfileData();
    setProfile(profileData[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email || !password) return;
    try {
      type === 'signin' ? await handleSignIn() : await handleSignup();
      setCurrentUser(getUser());
      history.push('/');
    } catch (e) {
      e.message ? setErrorMessage(e.message) : setErrorMessage('Unable to sign in. Try again');
    }
  };

  return (
    <div className="auth">
      <span className={`${type === 'signin' ? 'active' : ''}, signin`} onClick={() => setType('signin')}>
        [Sign In]          
      </span>
      <span className={type === 'signup' ? 'active' : ''} onClick={() => setType('signup')}>
        [Sign Up]    
      </span>
      <div className="error-message">{errorMessage}</div>
      <form className="auth-form" onSubmit={handleSubmit}>
        {type === 'signup' && (
          <label>
            Username
            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
          </label>
        )}
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
