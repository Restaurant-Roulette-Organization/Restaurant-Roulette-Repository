import { createContext, useEffect, useContext, useState } from 'react';
import { fetchRestaurants } from '../services/yelp';
import { useUserContext } from './UserContext';
const RestaurantContext = createContext();
const RestaurantProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [zipcode, setZipcode] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { lat, long } = useUserContext();
  useEffect(() => {
    try {
      const fetchData = async () => {
        console.log('running');
        const data = await fetchRestaurants('', lat, long);
        setRestaurants(data);
        setLoading(false);
      };
      fetchData();
    } catch (e) {
      setError(e.message);
    }
  }, [lat, long]);
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
