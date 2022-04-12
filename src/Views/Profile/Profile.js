import React from 'react';
import './Profile.css';

export default function Profile() {
  const user = 'Denver';
  const bio =
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo excepturi amet qui alias odit delectus neque assumenda laborum enim dolor?';
  const food = 'juice';

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
        <h1>Greetings, {user}</h1>
        <p>{bio}</p>
        <p>Your Fave Food: {food} </p>
      </div>
      <div className="faves"></div>
    </div>
  );
}
