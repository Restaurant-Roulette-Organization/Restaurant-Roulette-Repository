import React, { useEffect, useState } from 'react';
import { useRestaurantContext } from '../Context/RestaurantContext';
import { fetchRestaurants } from '../services/yelp';

export default function Filter() {
  const { zipcode, setZipcode, search, setSearch, setRestaurants } = useRestaurantContext();
  
  
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [debouncedZip, setDebouncedZip] = useState('');
  useEffect(() => {
    const timer = setTimeout(() =>{ 
      setSearch(debouncedQuery);
      setZipcode(debouncedZip)
      ;}, 900);
    return () => clearTimeout(timer);
  }, [debouncedQuery, setSearch, debouncedZip, setZipcode]);

  

  const handleChange = async () => {
    const searchData = await fetchRestaurants(zipcode, search);
    setRestaurants(searchData.businesses);
  };

  // finish restaurants
  return (
    <div className="filter">
      <div className="filter-control">
        <label>zipcode:</label>
        <input type="text" placeholder={zipcode} onChange={(e) => setDebouncedZip(e.target.value)} />
      </div>
      <div className="filter-control">
        <label> query:</label>
        <input type="text" placeholder={search} onChange={(e) => setDebouncedQuery(e.target.value)} />
      </div>
      <button onClick={handleChange}>search</button>
    </div>
  );
}
