import { useState, useEffect } from 'react';
import { fetchRestaurants } from '../../services/yelp';
export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [isFiltering, setIsFiltering] = useState(false);
  const sampleData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'duck', 'goose', 'santa', 'andy'];
  const randomIndex = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  useEffect (() => {
    const fetchData = async () => {
      const data = await fetchRestaurants();
      setRestaurants(data.businesses);
      setLoading(false);
    };
    fetchData();
  }, []
  );
  return (
    <div>
      <button onClick={() => setSelected(randomIndex(sampleData))}>Restaurant Roulette</button>
      <p onClick={() => setIsFiltering(!isFiltering)}>filter</p>
      {isFiltering && (
        <div>
          <select name="" id=""></select>
          <select name="" id=""></select>
          <select name="" id=""></select>
        </div>
      )}
      <div className="restaurants-container">
        <p>Results: {sampleData.length}</p>

        <button onClick={() => setSelected(null)}>See All</button>
      </div>
      {selected ? <p>{selected}</p> : sampleData.map((data) => <p key={data}>{data}</p>)}
    </div>
  );
}
