import { useState } from 'react';
import { useUserContext } from '../../Context/UserContext';
import { fetchProfileData, updateProfileData, insertProfileData } from '../../services/user';
import './Profile.css';

export default function Profile() {
  const {
    currentUser,
    profilePic,
    setProfilePic,
    bio,
    setBio,
    food,
    setFood,
    username,
    setUserName,
  } = useUserContext();
  const [error, setError] = useState('');

  const saveProfile = async (e) => {
    try {
      e.preventDefault();
      await insertProfileData({ username, bio, food, profilePic });
      history.push('/');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <div className="upper">
        <div className="settings-icon">set things</div>
        <div
          className="pfp"
          style={{
            backgroundImage: `${profilePic}`,
          }}
          alt="user profile picture"
        />
        <h1>Greetings, {currentUser}</h1>
        <p>{bio}</p>
        <p>Your Fave Food: {food} </p>
      </div>
      <div className="faves"></div>

      {error && (
        <p>
          {error}{' '}
          <span onClick={() => setError('')}>
            {' '}
            --- Something went wrong when creating your profile!!!
          </span>
        </p>
      )}

      <div>Edit Profile</div>
      <div className="edit-profile">
        <form>
          <form>
            <label>
              Name:
              <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} />
            </label>
            <label>
              Bio
              <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
            </label>
            <label>
              Food
              <input type="text" value={food} onChange={(e) => setFood(e.target.value)} />
            </label>
            <label>
              Image
              <input
                type="text"
                value={profilePic}
                onChange={(e) => setProfilePic(e.target.value)}
              />
            </label>
            <button onClick={saveProfile}>Save Profile</button>
          </form>
        </form>
      </div>
    </div>
  );
}
