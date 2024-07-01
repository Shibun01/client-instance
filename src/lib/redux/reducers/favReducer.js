// reducers/favReducer.js

const initialState = {
    items: [],
    error: null,
  };
  
  export const favReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_FAV':
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      case 'REMOVE_FROM_FAV':
        return {
          ...state,
          items: state.items.filter(item => item._id !== action.payload._id),
        };
      case 'INIT_FAV':
        return {
          ...state,
          items: action.payload,
        };
      case 'CLEAR_FAV':
        return initialState;
      default:
        return state;
    }
  };
  
  export const addToFav = (item) => ({
    type: 'ADD_TO_FAV',
    payload: item,
  });
  
  export const removeFromFav = (item) => ({
    type: 'REMOVE_FROM_FAV',
    payload: item,
  });
  
  export const initFav = (items) => ({
    type: 'INIT_FAV',
    payload: items,
  });
  
  export const clearFav = () => ({
    type: 'CLEAR_FAV',
  });
  