import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authReducer } from '../reducers/authReducer';
import { apiSlice } from '../api/rootApi';
import { cartReducer } from '../reducers/cartReducer';
import { favReducer } from '../reducers/favReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cart', 'fav'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  fav: favReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),   
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export { store, persistor };
