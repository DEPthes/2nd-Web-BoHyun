/* eslint-disable react/prop-types */
/* eslint-disable no-new */
import React, { useEffect, useRef } from 'react';

const Map = ({ location }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const mapOptions = {
      center: location,
      zoom: 10,
    };

    const map = new window.google.maps.Map(mapRef.current, mapOptions);

    new window.google.maps.Marker({
      position: location,
      map,
    });
  }, [location]);

  return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
};

export default Map;
