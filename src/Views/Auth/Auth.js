import React from 'react';
import { useState } from 'react';
import { getUser, insertProfileData, signInUser, signUpUser } from '../../services/user';
import { useUserContext } from '../../Context/UserContext';
import { useHistory } from 'react-router-dom';
import { useRestaurantContext } from '../../Context/RestaurantContext';
import { fetchRestaurants } from '../../services/yelp';
export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('signin');
  const [errorMessage, setErrorMessage] = useState('');

  const { setCurrentUser, lat, long, userName, setUserName } = useUserContext();
  const { setRestaurants } = useRestaurantContext();

  const history = useHistory();

  const handleSignup = async () => {
    const user = await signUpUser(email, password);
    console.log(user, 'user');
    await insertProfileData(userName, user.id);
  };

  // {signUpUser(email, password) insertProfileData(userName)}

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email || !password) return;
    try {
      type === 'signin' ? await signInUser(email, password) : await handleSignup();
      setCurrentUser(getUser());
      setRestaurants(await fetchRestaurants('', lat, long));
      history.push('/');
    } catch (e) {
      e.message ? setErrorMessage(e.message) : setErrorMessage('Unable to sign in. Try again');
    }
  };

  return (
    <div className="auth">
      <span className={type === 'signin' ? 'active' : ''} onClick={() => setType('signin')}>
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
