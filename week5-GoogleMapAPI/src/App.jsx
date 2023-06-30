/* eslint-disable arrow-parens */
import React, { useState } from 'react';
import Map from './Map';
import SearchBar from './SearchBar';

const App = () => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  const handleLocationChange = newLocation => {
    setLocation(newLocation);
  };

  return (
    <div>
      <SearchBar onLocationChange={handleLocationChange} />
      <Map location={location} />
    </div>
  );
};

export default App;
