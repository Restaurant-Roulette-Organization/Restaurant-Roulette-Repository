import { createContext, useContext, useState } from 'react';
import { getUser } from '../services/user';

const UserContext = createContext();
const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getUser());
  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser }}
    >
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
