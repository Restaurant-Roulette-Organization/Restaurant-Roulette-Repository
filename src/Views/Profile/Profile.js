import { useState } from 'react';
import { useUserContext } from '../../Context/UserContext';
import { fetchProfileData, updateProfileData, insertProfileData } from '../../services/user';
import './Profile.css';

export default function Profile() {
  const {
    profile: { profile_picture, userName, bio, favorite_food },
    setProfile,
  } = useUserContext();
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const saveProfile = async (e) => {
    try {
      e.preventDefault();
      history.push('/');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <div className="upper">
        <div className="settings-icon"></div>
        <div
          className="pfp"
          style={{
            backgroundImage: `url(${profile_picture})`,
          }}
          alt="user profile picture"
        />
        <h1>Greetings, {userName}</h1>
        <p>{bio}</p>
        <p>{favorite_food}</p>
      </div>
      <div className="faves"></div>

      {error && (
        <p>
          {error}{' '}
          <span onClick={() => setError('')}>
            Something went wrong when creating your profile!!!
          </span>
        </p>
      )}

      <div onClick={() => setIsEditing((prev) => !prev)}>✏️</div>
      <div className="edit-profile">
        {isEditing && (
          <form>
            <label>
              Name:
              <input
                type="text"
                value={userName}
                onChange={(e) =>
                  setProfile((prev) => {
                    return { ...prev, userName: e.target.value };
                  })
                }
              />
            </label>
            <label>
              Bio
              <input
                type="text"
                value={bio}
                onChange={(e) =>
                  setProfile((prev) => {
                    return { ...prev, bio: e.target.value };
                  })
                }
              />
            </label>
            <label>
              Food
              <input
                type="text"
                value={favorite_food}
                onChange={(e) =>
                  setProfile((prev) => {
                    return { ...prev, favorite_food: e.target.value };
                  })
                }
              />
            </label>

            <button onClick={saveProfile}>Save Profile</button>
          </form>
        )}
      </div>
    </div>
  );
}
