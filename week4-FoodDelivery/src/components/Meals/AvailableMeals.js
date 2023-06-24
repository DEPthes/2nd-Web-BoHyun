import React, { useContext } from 'react';
import { MenuContext } from '../../store/MenuProvider';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';



const AvailableMeals = ({meals}) => {
  const { menuSearch } = useContext(MenuContext);

  const filteredMenu = menuSearch
    ? meals.filter((meal) =>
        meal.name.toLowerCase().includes(menuSearch.toLowerCase())
      )
    : meals;

  const mealsList = filteredMenu.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {mealsList.length === 0 ? <p>너가 선택한 음식은 없다!</p> : mealsList}
       </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;