const initialState = {
  items: [],
  error: null,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const addItem = state.items.find(item => item._id === action.payload._id);
      if (addItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }
    case 'REMOVE_FROM_CART':
      const removeItem = state.items.find(item => item._id === action.payload._id);
      if (removeItem.quantity > 1) {
        return {
          ...state,
          items: state.items.map(item =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: state.items.filter(item => item._id !== action.payload._id),
        };
      }
    case 'INIT_CART':
      return {
        ...state,
        items: action.payload,
      };
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
};

export const addToCart = (item) => ({
  type: 'ADD_TO_CART',
  payload: item,
});

export const removeFromCart = (item) => ({
  type: 'REMOVE_FROM_CART',
  payload: item,
});

export const initCart = (items) => ({
  type: 'INIT_CART',
  payload: items,
});

export const clearCart = () => ({
  type: 'CLEAR_CART',
});
