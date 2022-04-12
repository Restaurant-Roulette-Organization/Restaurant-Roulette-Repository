import { useState } from 'react';
import './restaurantlist.css';
import { getUser } from '../../services/user';

export const RestaurantListItem = ({ name, rating, price, image_url, alias }) => {
  const [checked, setChecked] = useState(false);
  const user = getUser();
  console.log(user);
  return (
    <div className="card">
      <div className="restaurant-image" style={{ backgroundImage: `url(${image_url})` }}></div>

      <div className="bottom">
        <div className="left">
          <p className="price">{price}</p>
          <h3 className="title">{name}</h3>
          <p className="stars">{Array(Math.floor(rating)).fill('⭐️')}</p>
        </div>
        <div className="right">
          <div className="favorite" onClick={() => setChecked(!checked)}>
            {checked ? '❤️' : '🤍'}
          </div>
        </div>
      </div>
    </div>
  );
};
