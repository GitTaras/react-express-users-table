import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import {composeWithDevTools} from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
// export default configureStore = (initial state) => { why this is error conf store is not def
export default function configureStore (initialState, history) {
	return createStore(
		rootReducer,
		initialState,
		composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)))
	);
}


