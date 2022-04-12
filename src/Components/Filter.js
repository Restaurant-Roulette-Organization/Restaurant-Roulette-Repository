import React, { useEffect } from 'react';
import { useRestaurantContext } from '../Context/RestaurantContext';
import { fetchRestaurants } from '../services/yelp';

export default function Filter() {
  const { zipcode, setZipcode, search, setSearch, restaurants, setRestaurants } =
    useRestaurantContext();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRestaurants();
      setRestaurants(data);
    };
    fetchData();
  }, []);

  const handleChange = async () => {
    const searchData = await fetchRestaurants(zipcode, search);
    setRestaurants(searchData);
  };

  // finish restaurants
  return (
    <div className="filter">
      <div className="filter-control">
        <label>zipcode:</label>
        <input type="text" placeholder={zipcode} onChange={(e) => setZipcode(e.target.value)} />
      </div>
      <div className="filter-control">
        <label> query:</label>
        <input type="text" placeholder={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <button onClick={handleChange}>search</button>
    </div>
  );
}
