import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Auth from './Views/Auth/Auth';
import { useUserContext } from './Context/UserContext';
import Home from './Views/Home/Home';
import Profile from './Views/Profile/Profile';

function App() {
  const { currentUser } = useUserContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path={'/'}>
          <Home />
        </Route>
        <Route path={'/auth'}>
          <Auth />
        </Route>
        <Route path={'/profile'}>{currentUser ? <Profile /> : <Redirect to={'/auth'} />}</Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
