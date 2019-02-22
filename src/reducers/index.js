import { combineReducers } from 'redux';
import currentUser from './currentUser';
import users from './users';
import user from './user';
import fetchParams from './fetchParams';
import {routerReducer} from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form'
export default combineReducers({
		routing: routerReducer,
		users,
		user,
		currentUser,
		fetchParams,
		form: reduxFormReducer,
});