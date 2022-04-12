import { useState } from 'react';
import './restaurantlist.css';
import { getUserId } from '../../services/user';
import { createFavorite, deleteFavorite } from '../../services/favorites';

export const RestaurantListItem = ({ name, rating, price, image_url, alias }) => {
  const [checked, setChecked] = useState(false);

  const clickHandler = async () => {
    const user = getUserId();
    !checked ? await createFavorite(alias, user) : await deleteFavorite(alias, user);
    setChecked(!checked);
  };
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
          <div className="favorite" onClick={() => clickHandler()}>
            {checked ? '❤️' : '🤍'}
          </div>
        </div>
      </div>
    </div>
  );
};
