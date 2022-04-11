import { useState } from 'react';

export default function Home() {
  const [selected, setSelected] = useState(null);
  const [isFiltering, setIsFiltering] = useState(false);
  const sampleData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'duck', 'goose', 'santa', 'andy'];
  const randomIndex = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };
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
