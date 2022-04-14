import React from 'react';
import { useUserContext } from '../../Context/UserContext';
import { fetchProfileData, updateProfileData, insertProfileData } from '../../services/user';
import './Profile.css';

export default function Profile() {
  const { currentUser } = useUserContext();
  const bio = '';
  const favorite_food = '';

  const saveProfile = async (e) => {
    try {
      e.preventDefault();
      await insertProfileData({ username, bio, favorite_food, image });
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
            backgroundImage: `url(https://i.pinimg.com/564x/cb/b6/1d/cbb61dc9f560a4e96c2c64f41a90ce3f.jpg)`,
          }}
          alt="user profile picture"
        />
        <h1>Greetings, {currentUser}</h1>
        <p>{bio}</p>
        <p>Your Fave Food: {favorite_food} </p>
      </div>
      <div className="faves"></div>

      {/* --------------------------------------------------------- */}

      <div>Edit Profile</div>
      <div className="edit-profile">
        <form>
          <form>
            <label>
              Name:
              <input type="text" value={username} onChange={(e) => setUserame(e.target.value)} />
            </label>
            <label>
              Bio
              <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
            </label>
            <label>
              Food
              <input type="text" value={fav_food} onChange={(e) => setFood(e.target.value)} />
            </label>
            <label>
              Image
              <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
            </label>
            <button onClick={saveProfile}>Save Profile</button>
          </form>
        </form>
      </div>
    </div>
  );
}
