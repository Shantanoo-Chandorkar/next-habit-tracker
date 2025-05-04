export const initialHabitState = [];

export const habitReducer = (state, action) => {
  switch (action.type) {
    case 'SET_HABITS':
      return action.payload;
    case 'ADD_HABIT':
      return [action.payload, ...state];
    case 'UPDATE_HABIT':
      return state.map(h => h._id === action.payload._id ? action.payload : h);
    case 'DELETE_HABIT':
      return state.filter(h => h._id !== action.payload);
    default:
      return state;
  }
};
