import { createContext, useEffect, useContext, useState, useCallback } from 'react';
import { fetchRestaurants } from '../services/yelp';
import { useUserContext } from './UserContext';
const RestaurantContext = createContext();
const RestaurantProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [zipcode, setZipcode] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { lat, long, setLat, setLong } = useUserContext();

  const success = useCallback(
    async (position) => {
      const {
        coords: { latitude, longitude },
      } = position;
      setLat(latitude);
      setLong(longitude);
    },
    [setLat, setLong]
  );
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(success);
    }
    try {
      const fetchData = async () => {
        console.log('running');
        if (!lat || !long) return;
        const data = await fetchRestaurants('', lat, long);
        setRestaurants(data);
        setLoading(false);
      };
      fetchData();
    } catch (e) {
      setError(e.message);
    }
  }, [lat, long, success]);
  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        setRestaurants,
        zipcode,
        setZipcode,
        search,
        setSearch,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};
const useRestaurantContext = () => {
  const context = useContext(RestaurantContext);
  if (context === undefined) {
    throw new Error('useRestaurant context must be used within a provider');
  }
  return context;
};
export { RestaurantProvider, useRestaurantContext };
