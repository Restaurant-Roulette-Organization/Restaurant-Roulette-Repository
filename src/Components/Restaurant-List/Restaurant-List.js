import './restaurantlist.css';
import { getUserId } from '../../services/user';
import { createFavorite, deleteFavorite } from '../../services/favorites';
import { useRestaurantContext } from '../../Context/RestaurantContext';
import { fetchRestaurants } from '../../services/yelp';
import { Link } from 'react-router-dom';

export const RestaurantListItem = ({ name, rating, price, image_url, alias, checked }) => {
  const { setRestaurants } = useRestaurantContext();

  const clickHandler = async () => {
    const user = getUserId();
    !checked ? await createFavorite(alias, user) : await deleteFavorite(alias, user);
    const data = await fetchRestaurants();
    setRestaurants(data);
  };
  return (
    <div className="card">
      <Link to={`/restaurants/${alias}`}>
        <div className="restaurant-image" style={{ backgroundImage: `url(${image_url})` }}></div>
        <h3 className="title">{name}</h3>
      </Link>
      <div className="bottom">
        <div className="left">
          <p className="price">{price}</p>
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
