import React from 'react';
import MealsSummary from './MealsSummary';
import AvailableMeals from './AvailableMeals';
import MenuSearch from '../MenuSearch/MenuSearch';
import MenuProvider from '../../store/MenuProvider';

const Meals = () => {
  const DUMMY_MEALS = [
    {
      id: 'm1',
      name: 'sushi',
      description: 'Finest fish and veggies',
      price: 22.99,
    },
    {
      id: 'm2',
      name: 'maratang',
      description: 'Maratang tang',
      price: 16.5,
    },
    {
      id: 'm3',
      name: 'pizza',
      description: 'American, raw, meaty',
      price: 12.99,
    },
    {
      id: 'm4',
      name: 'tteokbokkkki',
      description: 'Healthy...and green...',
      price: 18.99,
    },
    {
      id: 'm5',
      name: 'bibimbap',
      description: 'Traditional Korean mixed rice dish',
      price: 14.99,
    },
    {
      id: 'm6',
      name: 'ramen',
      description: 'Japanese noodle soup dish',
      price: 10.99,
    },
    {
      id: 'm7',
      name: 'hamburger',
      description: 'Classic American burger',
      price: 8.99,
    },
  ];
  return (
    <MenuProvider>
        <MealsSummary  />
        <MenuSearch meals={DUMMY_MEALS} />
        <AvailableMeals meals={DUMMY_MEALS} />
    </MenuProvider>
  );
};

export default Meals;
