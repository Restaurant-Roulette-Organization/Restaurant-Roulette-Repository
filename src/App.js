import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Auth from './Views/Auth/Auth';
import { useUserContext } from './Context/UserContext';
import Home from './Views/Home/Home';
import Profile from './Views/Profile/Profile';
import NavHeader from './Components/NavHeader/NavHeader';
import RestaurantDetail from './Views/RestaurantDetail/RestaurantDetail';
import AboutMe from './AboutMe/AboutMe';

function App() {
  const { currentUser } = useUserContext();

  return (
    <BrowserRouter>
      <NavHeader />
      <div className="App">
        <Route exact path={'/'}>
          <Home />
        </Route>
        <Route exact path={'/restaurants/:alias'}>
          <RestaurantDetail />
        </Route>
        <Route path={'/auth'}>
          <Auth />
        </Route>
        <Route path={'/profile'}>{currentUser ? <Profile /> : <Redirect to={'/auth'} />}</Route>
        <Route exact path={'/aboutme'}>
          <AboutMe />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
