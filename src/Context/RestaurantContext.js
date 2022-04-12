import { createContext, useEffect, useContext, useState } from 'react';
import { getFavorites } from '../services/favorites';
import { fetchRestaurants } from '../services/yelp';
const RestaurantContext = createContext();
const RestaurantProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [zipcode, setZipcode] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await fetchRestaurants();

        setRestaurants(data);
        setLoading(false);
      };
      fetchData();
    } catch (e) {
      setError(e.message);
    }
  }, []);
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
