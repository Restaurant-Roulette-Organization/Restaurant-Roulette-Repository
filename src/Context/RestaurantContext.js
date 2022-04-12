import { createContext, useContext, useState } from 'react';
import { getUser } from '../services/user';

const RestaurantContext = createContext();
const RestaurantProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState(['applebees']);
  const [zipcode, setZipcode] = useState('');
  const [search, setSearch] = useState('');
  return (
    <RestaurantContext.Provider
      value={{ restaurants, setRestaurants, zipcode, setZipcode, search, setSearch }}
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
