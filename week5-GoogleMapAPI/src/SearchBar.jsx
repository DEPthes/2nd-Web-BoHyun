/* eslint-disable react/prop-types */
/* eslint-disable prefer-destructuring */
/* eslint-disable arrow-parens */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';

const SearchBar = ({ onLocationChange }) => {
  const [query, setQuery] = useState('');
  // useRef로 바꿔서 해보기
  const handleSearch = () => {
    const apiKey = 'AIzaSyAHTj8H7omSvxjE1v-hO1LwNtlRdnZuO1I';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.results.length > 0) {
          const location = data.results[0].geometry.location;
          onLocationChange(location);
        } else {
          console.error('No results found.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
