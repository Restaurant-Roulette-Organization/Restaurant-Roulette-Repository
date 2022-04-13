import { NavLink } from 'react-router-dom';
import { useRestaurantContext } from '../../Context/RestaurantContext';
import { useUserContext } from '../../Context/UserContext';
import { logout } from '../../services/user';
import { fetchRestaurants } from '../../services/yelp';

export default function NavHeader() {
  const { currentUser, setCurrentUser, lat, long } = useUserContext();
  const { setRestaurants } = useRestaurantContext();

  const handleLogout = async () => {
    await logout();
    setCurrentUser(null);
    const newRestaurants = await fetchRestaurants('', lat, long);
    setRestaurants(newRestaurants);
  };

  return (
    <div className="nav-header">
      <div>
        <button>
          <NavLink exact to="/">
            Home
          </NavLink>
        </button>
      </div>
      <div>
        {!currentUser && (
          <button>
            <NavLink to="/auth">Login/Sign-up</NavLink>
          </button>
        )}
      </div>
      <div>
        {currentUser && (
          <button>
            <NavLink exact to="/profile">
              Your profile
            </NavLink>
          </button>
        )}
      </div>
      <div>
        {currentUser && (
          <button>
            <NavLink exact to="/aboutme">
              About Creators
            </NavLink>
          </button>
        )}
      </div>
      <div>
        {currentUser && (
          <div>
            <p>User: {currentUser}</p>
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
