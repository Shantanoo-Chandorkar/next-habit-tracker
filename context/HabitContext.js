'use client';
import React, { createContext, useReducer, useContext } from 'react';
import { habitReducer, initialHabitState } from '../reducers/habitReducer';
import { categoryReducer, initialCategoryState } from '../reducers/categoryReducer';

const HabitContext = createContext();

const combinedReducer = ({ habits, categories }, action) => ({
  habits: habitReducer(habits, action),
  categories: categoryReducer(categories, action),
});

const initialState = {
  habits: initialHabitState,
  categories: initialCategoryState,
};

export const HabitProvider = ({ children }) => {
  const [state, dispatch] = useReducer(combinedReducer, initialState);
  return (
    <HabitContext.Provider value={{ state, dispatch }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabitContext = () => useContext(HabitContext);
