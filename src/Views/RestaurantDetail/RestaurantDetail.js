import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RestaurantDetail.css';
import { useRestaurantContext } from '../../Context/RestaurantContext';
import { getUserId } from '../../services/user';
import { createFavorite, deleteFavorite } from '../../services/favorites';



export default function RestaurantDetail() {
  const { restaurants, error, setError } = useRestaurantContext();
  
  
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchData = () => {
      try {
        const restaurantObject = restaurants.find(item => item.alias === params.alias);
        setRestaurant(restaurantObject);
        setLoading(false);
      } catch (e) {
        setError(e.message);
      }
    };
    fetchData();
  }, [params.alias, setError, setLoading, setRestaurant, restaurants]);
  if (loading || !restaurant) return <h1>Loading...</h1>;

  const clickHandler = async () => {
    const user = getUserId();
    !restaurant.checked ? await createFavorite(params.alias, user) : await deleteFavorite(params.alias, user);
    setRestaurant((prev) => {return { ...prev, checked: !prev.checked };});
    
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <h3 className="title">{restaurant.name}</h3>
      <div className="restaurant-image" style={{ backgroundImage: `url(${restaurant.image_url})` }}></div>
      <p className="price">{restaurant.price}</p>
      <p className="stars">{Array(Math.floor(restaurant.rating)).fill('⭐️')}</p>
      <p>{restaurant.location.address1}</p>
      <p>{restaurant.display_phone}</p>
      <div className="favorite" onClick={() => clickHandler()}>
        {restaurant.checked ? '❤️' : '🤍'}
      </div>
      {/* <div>{notes}</div> */}
    </div>
  );
}
