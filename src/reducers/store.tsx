import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const history = createHistory();
const middleware = routerMiddleware(history);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(middleware))
);
export const persistor = persistStore(store);
export default store;
