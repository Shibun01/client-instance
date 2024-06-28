// authReducer.js
const initialState = {
  user: null,
  token: null,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};

export const loginSuccess = (payload) => ({
  type: 'LOGIN_SUCCESS',
  payload,
});

export const loginFailure = (payload) => ({
  type: 'LOGIN_FAILURE',
  payload,
});

export const logout = () => ({
  type: 'LOGOUT',
});
