import React, { createContext, useState } from 'react';

export const MenuContext = createContext();

const MenuProvider = ({ children }) => {
  const [menuSearch, setMenuSearch] = useState('');

  const handleSearch = (searchValue) => {
    setMenuSearch(searchValue);
  };

  return (
    <MenuContext.Provider value={{ menuSearch, handleSearch }}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuProvider;
