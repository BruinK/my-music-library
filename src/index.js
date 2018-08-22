import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import './index.css';
import App from './App';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';
import serverApi from './middleware/serverApi';
import MusicLibrary from './container/musicLibrary/musicLibrary';

const logger = createLogger();
const store = createStore(
  rootReducer,
  compose(applyMiddleware(serverApi, logger))
);

const routes = [{
  path: '/',
  component: App,
  indexRoute: { component: MusicLibrary },
  childRoutes: [{}]
}];

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>

  , document.getElementById('root')
);
registerServiceWorker();
