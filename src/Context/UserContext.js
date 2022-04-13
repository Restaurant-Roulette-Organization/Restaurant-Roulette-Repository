import { createContext, useContext, useState } from 'react';
import { getUser } from '../services/user';

const UserContext = createContext();
const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getUser());
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, long, setLong, lat, setLat }}>
      {children}
    </UserContext.Provider>
  );
};
const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useRestaurant context must be used within a provider');
  }
  return context;
};
export { UserProvider, useUserContext };
