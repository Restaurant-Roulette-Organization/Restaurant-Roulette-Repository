import './restaurantlist.css';
import { getUserId } from '../../services/user';
import { createFavorite, deleteFavorite } from '../../services/favorites';
import { useRestaurantContext } from '../../Context/RestaurantContext';
import { fetchRestaurants } from '../../services/yelp';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../Context/UserContext';
import Notes from '../Notes/Notes';

export const RestaurantListItem = ({ name, rating, price, image_url, alias, checked }) => {
  const { setRestaurants, loading } = useRestaurantContext();
  const { currentUser } = useUserContext();

  const clickHandler = async () => {
    const user = getUserId();
    setRestaurants((prev) =>
      prev.map((item) => (item.alias === alias ? { ...item, checked: !item.checked } : item))
    );
    !checked ? await createFavorite(alias, user) : await deleteFavorite(alias, user);
    // const data = await fetchRestaurants('', lat, long);
  };
  setTimeout(() => {}, 1000);
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
          {currentUser && (
            <div className="favorite" onClick={() => clickHandler()}>
              {checked ? '❤️' : '🤍'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
//
