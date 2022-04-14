import { useState } from 'react';
import { RestaurantListItem } from '../../Components/Restaurant-List/Restaurant-List';
import Filter from '../../Components/Filter';
import { useRestaurantContext } from '../../Context/RestaurantContext';
import filter from '../../sliders.svg';
import './Home.css';
export default function Home() {
  const { restaurants, error } = useRestaurantContext();
  const [selected, setSelected] = useState(null);
  const [isFiltering, setIsFiltering] = useState(false);

  const randomIndex = (array) => {
    const randomNum = Math.floor(Math.random() * array.length);
    return array[randomNum];
  };

  return (
    <div className="filter-control">
      <div className="filter-comp">
        <div className="spin" onClick={() => setSelected(randomIndex(restaurants))}>
          Restaurant Roulette
        </div>
        <p> </p>
        <img onClick={() => setIsFiltering(!isFiltering)} src={filter} alt="filter" />
        <p>Results: {restaurants.length}</p>
        {isFiltering && (
          <div>
            <Filter />
          </div>
        )}
      </div>
      <div className="restaurants-container">
        <div>
          {error && <p>{error}</p>}
          {selected && <button onClick={() => setSelected(null)}>See All</button>}
        </div>
        {selected ? (
          <RestaurantListItem {...selected} />
        ) : (
          restaurants.map((data) => <RestaurantListItem key={data.id} {...data} />)
        )}
      </div>
    </div>
  );
}
