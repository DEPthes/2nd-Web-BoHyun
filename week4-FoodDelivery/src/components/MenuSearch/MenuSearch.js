import React, { useContext, useState } from 'react';
import { MenuContext } from '../../store/MenuProvider'; 
import classes from './MenuSearch.module.css';

const MenuSearch =({ meals }) => {
  const { handleSearch } = useContext(MenuContext);
  const [autoCompleteResults, setAutoCompleteResults] = useState([]);

  const handleChange = (e) => {
    // 검색 입력 값에 대한 처리
    const searchValue = e.target.value;
    handleSearch(searchValue);

    //입력 값이 없는 경우 자동완성 결과를 비워줌
    if (searchValue === '') {
            setAutoCompleteResults([]);
            return;
          }

          
    // 검색 값에 따른 자동완성에 대한 처리
    const autoCompleteValue = e.target.value; 
    const filteredResults = meals.filter((meal) =>
      meal.name.toLowerCase().includes(autoCompleteValue.toLowerCase())
    );
    setAutoCompleteResults(filteredResults);
  
  };

  const handleAutoCompleteSelection = (selectedResult) => {
    console.log(selectedResult);
    // 자동완성 클릭 시 menuSearch에 대한 state 업데이트
    handleSearch(selectedResult.name);
  }


  return (
    <div>
      <input className={classes.search} type="text" onChange={handleChange} placeholder="메뉴 검색" />
    
      {autoCompleteResults.length > 0 && (
        <ul>
          {autoCompleteResults.map((result) => (
            <li
              className={classes.search}
              key={result.id}
              onClick={() => handleAutoCompleteSelection(result)}
            >
              {result.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MenuSearch;
