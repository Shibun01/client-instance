const initialState = {
  items: [],
  error: null,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingProduct = state.items.find(item => item._id === action.payload._id);
      if (existingProduct) {
        return {
          ...state,
          items: state.items.map(item =>
            item._id === action.payload._id ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
    case 'REMOVE_FROM_CART':
      const product = state.items.find(item => item._id === action.payload._id);
      if (product && product.quantity > 1) {
        return {
          ...state,
          items: state.items.map(item =>
            item._id === action.payload._id ? { ...item, quantity: item.quantity - 1 } : item
          )
        };
      }
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload._id)
      };
    case 'INIT_CART':
      return {
        ...state,
        items: action.payload,
      };
    case 'DELETE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload._id)
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

export const deleteFromCart = (item) => ({
  type: 'DELETE_FROM_CART',
  payload: item
});
