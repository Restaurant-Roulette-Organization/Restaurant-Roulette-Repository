import './App.css';
import { useState } from 'react';
import { useRestaurantContext } from './Context/RestaurantContext';
import { getUser } from './services/user';
import Auth from './Views/Auth/Auth';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  const { restaurants } = useRestaurantContext();
  const [currentUser, setCurrentUser] = useState(getUser());
  // setCurrentUser();
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route>
            {restaurants[0]}
            <Auth setCurrentUser={setCurrentUser} />
            <p>{currentUser}</p>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
