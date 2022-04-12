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
        const { businesses } = await fetchRestaurants();
        const favs = await getFavorites();
        const aliases = favs.map(({ restaurant_alias }) => restaurant_alias);

        const mutated = businesses.map((business) => {
          for (const alias of aliases) {
            if (alias === business.alias) return { ...business, checked: true };
          }
          return business;
        });

        setRestaurants(mutated);
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
