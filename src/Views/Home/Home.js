import { useState } from 'react';
import { RestaurantListItem } from '../../Components/Restaurant-List/Restaurant-List';
import Filter from '../../Components/Filter';
import { useRestaurantContext } from '../../Context/RestaurantContext';
export default function Home() {
  const { restaurants, error } = useRestaurantContext();
  const [selected, setSelected] = useState(null);
  const [loading, setloading] = useState(true);

  const [isFiltering, setIsFiltering] = useState(false);

  const randomIndex = (array) => {
    const randomNum = Math.floor(Math.random() * array.length);
    return array[randomNum];
  };

  // if (loading) return <div> loading</div>;

  return (
    <div>
      <button onClick={() => setSelected(randomIndex(restaurants))}>Restaurant Roulette</button>
      <p onClick={() => setIsFiltering(!isFiltering)}>filter</p>
      {isFiltering && (
        <div>
          <Filter />
        </div>
      )}
      <div className="restaurants-container">
        {error && <p>{error}</p>}
        <p>Results: {restaurants.length}</p>
        {selected && <button onClick={() => setSelected(null)}>See All</button>}
      </div>
      {!loading && selected ? (
        <RestaurantListItem {...selected} />
      ) : (
        restaurants.map((data) => <RestaurantListItem key={data.id} {...data} />)
      )}
    </div>
  );
}
