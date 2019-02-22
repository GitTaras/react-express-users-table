import React from 'react';
import {Redirect, Route, Switch } from 'react-router-dom';
// componenst
import Header from './components/Header'
import Login from './containers/Login.js';
import MainPage from './containers/Main';
import Forget from './containers/Forget';
import Reset from './containers/Reset';
import AddUser from './containers/AddUser';
import UpdateUser from './containers/UpdateUser';
import NoRoute from './components/NoRoute'
import Authorization from './modules/Authorization'

const MainPageWithUser = Authorization(['user', 'manager', 'admin'])(MainPage)
const AddUserWithManager = Authorization(['manager', 'admin'])(AddUser)
const UpdateUserWithManager = Authorization(['manager', 'admin'])(UpdateUser)

export default (
	<React.Fragment>
		<Header/>
		<Switch>
			<Route exact path="/main" component={MainPageWithUser}/>
			<Route exact path="/add" component={AddUserWithManager}/>
			<Route exact path="/login" component={Login}/>
			<Route exact path="/forget" component={Forget}/>
			<Route exact path="/reset/:id/:token" component={Reset}/>
			<Route exact path="/update/user/:id" component={UpdateUserWithManager}/>
			<Route component={NoRoute}/>
		</Switch>
	</React.Fragment>
);



//<Route path="/" component={MainPageWithUser} />