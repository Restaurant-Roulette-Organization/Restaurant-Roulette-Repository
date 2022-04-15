import React, { useEffect, useState } from 'react';
import { useRestaurantContext } from '../Context/RestaurantContext';
import { useUserContext } from '../Context/UserContext';
import { fetchRestaurantZip, fetchRestaurants } from '../services/yelp';

export default function Filter() {
  const { zipcode, setZipcode, search, setSearch, setRestaurants, setLoading } =
    useRestaurantContext();
  const { lat, long } = useUserContext();

  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [error, setError] = useState('');
  const [debouncedZip, setDebouncedZip] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(debouncedQuery);
      setZipcode(debouncedZip);
    }, 900);
    return () => clearTimeout(timer);
  }, [debouncedQuery, setSearch, debouncedZip, setZipcode]);

  const handleChange = async () => {
    try {
      if (zipcode === '') {
        if (lat && long) {
          const searchData = await fetchRestaurants(search, lat, long);
          setLoading(false);
          return setRestaurants(searchData);
        } else {
          setError('Please enter your zipcode.');
        }
      } else {
        setError('');
        const searchData = await fetchRestaurantZip(zipcode, search);
        setLoading(false);
        return setRestaurants(searchData);
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="filter">
      {!lat && !long && (
        <div className="filter-control">
          {error && <p>{error}</p>}
          <label>zipcode:</label>
          <input
            type="text"
            placeholder={zipcode}
            onChange={(e) => setDebouncedZip(e.target.value)}
          />
        </div>
      )}
      <div className="filter-control">
        <label> query:</label>
        <input
          type="text"
          placeholder={search}
          onChange={(e) => setDebouncedQuery(e.target.value)}
        />
      </div>
      <button onClick={handleChange}>search</button>
    </div>
  );
}
