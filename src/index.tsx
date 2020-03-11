import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './components/App';
import './styles/main.css';
import { ApolloProvider } from 'react-apollo';
import { store, persistor } from './reducers/store';
import { PersistGate } from 'redux-persist/integration/react';
import ApolloClient from 'apollo-boost';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HashRouter>
        <ApolloProvider
          client={new ApolloClient(store.getState().clientReducer.client)}
        >
          <App />
        </ApolloProvider>
      </HashRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
