import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import {BrowserRouter, Router, Route, Switch, Redirect, withRouter} from 'react-router-dom';
import {ConnectedRouter/*, routerReducer, routerMiddleware, push*/} from 'react-router-redux';

import routes from './routes';

import registerServiceWorker from './registerServiceWorker';

import createBrowserHistory from "history/createBrowserHistory";
const history = createBrowserHistory();

const initialState={};
const store = configureStore(initialState, history);

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			{ routes }
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();