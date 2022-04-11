import { useState, useEffect } from 'react';
import { fetchRestaurants } from '../../services/yelp';
import { RestaurantListItem } from '../../Components/Restaurant-List/Restaurant-List';
export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');

  const [isFiltering, setIsFiltering] = useState(false);

  const randomIndex = (array) => {
    const randomNum = Math.floor(Math.random() * array.length);
    return array[randomNum];
  };

  useEffect (() => {
    try {
      const fetchData = async () => {
        const data = await fetchRestaurants();
        setRestaurants(data.businesses);
        setLoading(false);
      };
      fetchData();
    } catch (e) {
      setError(e.message);
    }
  }, []
  );

  

  return (
    <div>
      <button onClick={() => setSelected(randomIndex(restaurants))}>Restaurant Roulette</button>
      <p onClick={() => setIsFiltering(!isFiltering)}>filter</p>
      {isFiltering && (
        <div>
          <select name="" id=""></select>
          <select name="" id=""></select>
          <select name="" id=""></select>
        </div>
      )}
      <div className="restaurants-container">
        {error && <p>{error}</p>}
        <p>Results: {restaurants.length}</p>
        <button onClick={() => setSelected(null)}>See All</button>
      </div>
      {loading && <div className='loader'>loader</div>}
      {selected ? <RestaurantListItem {...selected} /> : restaurants.map((data) => <RestaurantListItem key={data.id} {...data} />)}
    </div>
  );
}
