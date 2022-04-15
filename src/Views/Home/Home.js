import { useState } from 'react';
import { RestaurantListItem } from '../../Components/Restaurant-List/Restaurant-List';
import Filter from '../../Components/Filter';
import { useRestaurantContext } from '../../Context/RestaurantContext';
import filter from '../../sliders.svg';
import './Home.css';
export default function Home() {
  const { restaurants } = useRestaurantContext();
  const [selected, setSelected] = useState(null);
  const [isFiltering, setIsFiltering] = useState(false);

  const randomIndex = (array) => {
    const randomNum = Math.floor(Math.random() * array.length);
    return array[randomNum];
  };

  return (
    <div className="filter-control">
      <div className="filter-comp">
        <button className="spin" onClick={() => setSelected(randomIndex(restaurants))}>
          Restaurant Roulette
        </button>
        <p> </p>
        <img
          className="filter-button"
          onClick={() => setIsFiltering(!isFiltering)}
          src={filter}
          alt="filter"
        />
        <p>Results: {restaurants.length}</p>
        {isFiltering && (
          <div>
            <Filter />
          </div>
        )}
        {selected && <button onClick={() => setSelected(null)}>See All</button>}
      </div>
      <div className="restaurants-container">
        {selected ? (
          <RestaurantListItem {...selected} />
        ) : (
          restaurants.map((data) => <RestaurantListItem key={data.id} {...data} />)
        )}
      </div>
    </div>
  );
}
