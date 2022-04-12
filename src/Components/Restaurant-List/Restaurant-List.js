import { useState } from 'react';
import './restaurantlist.css';

export const RestaurantListItem = ({ name, rating, price, image_url }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="card">
      <div className="restaurant-image" style={{ backgroundImage: `url(${image_url})` }}></div>

      <p className="price">{price}</p>
      <h3 className="title">{name}</h3>
      <div className="stars-heart">
        <p className="stars">{Array(Math.floor(rating)).fill('⭐️')}</p>
        <div className="favorite" onClick={() => setChecked(!checked)}>
          {checked ? '❤️' : '🤍'}
        </div>
      </div>
    </div>
  );
};
