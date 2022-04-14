import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RestaurantDetail.css';
import { useRestaurantContext } from '../../Context/RestaurantContext';
import { getUserId } from '../../services/user';
import { createFavorite, deleteFavorite } from '../../services/favorites';
import Notes from '../../Components/Notes/Notes';
import { fetchNote } from '../../services/notes';
import { useUserContext } from '../../Context/UserContext';

export default function RestaurantDetail() {
  const { restaurants, error, setError } = useRestaurantContext();
  const { currentUser } = useUserContext();
  const [success, setSuccess] = useState(false);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState(null);
  const { alias } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurantObject = restaurants.find((item) => item.alias === alias);
        setRestaurant(restaurantObject);
        const noteData = await fetchNote(alias);
        !noteData ? setLoading(false) : setNotes(noteData[0]);
      } catch (e) {
        setError(e.message);
      }
    };
    fetchData();
  }, [alias, setError, setLoading, setRestaurant, restaurants]);
  if (loading || !restaurant) return <h1>Loading...</h1>;

  const clickHandler = async () => {
    const user = getUserId();
    !restaurant.checked ? await createFavorite(alias, user) : await deleteFavorite(alias, user);
    setRestaurant((prev) => {
      return { ...prev, checked: !prev.checked };
    });
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <h3 className="title">{restaurant.name}</h3>
      <div
        className="restaurant-image"
        style={{ backgroundImage: `url(${restaurant.image_url})` }}
      ></div>
      <p className="price">{restaurant.price}</p>
      <p className="stars">{Array(Math.floor(restaurant.rating)).fill('⭐️')}</p>
      <p>{restaurant.location.address1}</p>
      <p>{restaurant.display_phone}</p>
      {currentUser && (
        <div className="favorite" onClick={() => clickHandler()}>
          {restaurant.checked ? '❤️' : '🤍'}
        </div>
      )}
      {success && <h3>Note successfully added!</h3>}

      {!notes ? (
        <Notes
          {...{
            setSuccess,
            alias,
          }}
        />
      ) : (
        <p>{notes.note}</p>
      )}
    </div>
  );
}
