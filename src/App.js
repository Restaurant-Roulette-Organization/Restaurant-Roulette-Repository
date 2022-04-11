import './App.css';
import { useState } from 'react';
import { useRestaurantContext } from './Context/RestaurantContext';
import { getUser } from './services/user';
import Auth from './Views/Auth/Auth';
import { BrowserRouter } from 'react-router-dom';
import { Switch } from 'react-router-dom';

function App() {
  const { restaurants } = useRestaurantContext();
  const [currentUser, setCurrentUser] = useState(getUser());
  setCurrentUser();
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {restaurants[0]}
          <Auth setCurrentUser={setCurrentUser} />
          <p>{currentUser}</p>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
