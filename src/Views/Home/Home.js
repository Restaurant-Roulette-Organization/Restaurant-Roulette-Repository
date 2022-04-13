import { useState } from 'react';
import { RestaurantListItem } from '../../Components/Restaurant-List/Restaurant-List';
import Filter from '../../Components/Filter';
import { useRestaurantContext } from '../../Context/RestaurantContext';
import { useUserContext } from '../../Context/UserContext';
export default function Home() {
  const { restaurants, error, loading, setLoading } = useRestaurantContext();
  const [selected, setSelected] = useState(null);

  const [isFiltering, setIsFiltering] = useState(false);
  const { setLat, setLong } = useUserContext();

  const randomIndex = (array) => {
    const randomNum = Math.floor(Math.random() * array.length);
    return array[randomNum];
  };
  const success = (position) => {
    setLoading(true);
    const {
      coords: { latitude, longitude },
    } = position;
    setLat(latitude);
    setLong(longitude);
    setLoading(false);
  };
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(success);
  }
  if (loading) return <div> loading</div>;

  return (
    <div>
      <button onClick={() => setSelected(randomIndex(restaurants))}>Restaurant Roulette</button>
      <p onClick={() => setIsFiltering(!isFiltering)}>filter</p>
      {isFiltering && (
        <div>
          <Filter />
          <select name="" id=""></select>
          <select name="" id=""></select>
          <select name="" id=""></select>
        </div>
      )}
      <div className="restaurants-container">
        {error && <p>{error}</p>}
        <p>Results: {restaurants.length}</p>
        {selected && <button onClick={() => setSelected(null)}>See All</button>}
      </div>
      {loading && <div className="loader">loader</div>}
      {selected ? (
        <RestaurantListItem {...selected} />
      ) : (
        restaurants.map((data) => <RestaurantListItem key={data.id} {...data} />)
      )}
    </div>
  );
}
