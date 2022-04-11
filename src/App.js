import './App.css';
import { useRestaurantContext } from './Context/FoodContext';

function App() {
  const { restaurants } = useRestaurantContext();

  return <div className="App">{restaurants[0]}</div>;
}

export default App;
