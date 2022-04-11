import './App.css';
import { useRestaurantContext } from './Context/RestaurantContext';

function App() {
  const { restaurants } = useRestaurantContext();

  return <div className="App">{restaurants[0]}</div>;
}

export default App;
