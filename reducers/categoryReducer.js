export const initialCategoryState = [];

export const categoryReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return action.payload;
    case 'ADD_CATEGORY':
      return [...state, action.payload];
    // future: case 'UPDATE_CATEGORY', 'DELETE_CATEGORY'
    default:
      return state;
  }
};
