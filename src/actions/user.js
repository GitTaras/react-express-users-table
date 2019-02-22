import Auth from '../modules/Auth';
import {push} from 'react-router-redux';
import {addUserReq, updateUserReq, deleteUserReq, getUserReq} from './api';

export function fUsersFailed(e) {
		return {
				type: 'FUSER_FAILED',
				etext: e
		};
}


export function fUsersStarted(bool) {
		return {
				type: 'FUSER_START',
				isLoading: bool
		};
}

export function getUserSuccess(res) {
		return {
				type: 'GET_USER_SUCCESS',
				user: res
		};
}

export function AddUserSuccess(res) {
		return {
				type: 'ADD_USER_SUCCESS',
				user: res,
				message: res.message,
		};
}

export function updateUserSuccess(res) {
		return {
				type: 'UPDATE_USER_SUCCESS',
				user: res
		};
}

export function deleteUserSuccess(res) {
		return {
				type: 'DELETE_USER_SUCCESS',
				user: res.user
		};
}

export function clear() {
	return {
		type: 'CLEAR'
	}
}

export function unsetSuccessefulyFlag() {
	return {
		type: 'UNSET_SUCCESSEFULY_FLAG'
	}
}

export function getUser(id) {
	return function(dispatch) {
		dispatch(fUsersStarted(true));
		return getUserReq(id).then(res =>{
				console.log('---getUserback---', res);
				dispatch(getUserSuccess(res));
				dispatch(fUsersStarted(false));
			}).catch(e=>{
				dispatch(fUsersFailed(e));
				console.log("ERROR", e);
			});
	}
}

export function addUser(user) {
	return function(dispatch) {
		dispatch(fUsersStarted(true));
		addUserReq(user).then(res =>{
			console.log('---addUserback---', res);
			dispatch(AddUserSuccess(res));
			dispatch(fUsersStarted(false));
			setTimeout(()=>
				dispatch(unsetSuccessefulyFlag()),3000
			)
		}).catch(e=>{
			dispatch(fUsersFailed(e));
			console.log("ERROR", e);
		});
	}
}

export function updateUser(user) {
	return function(dispatch) {
		dispatch(fUsersStarted(true));

		return updateUserReq(user).then(res => {
				dispatch(updateUserSuccess(res));
				dispatch(fUsersStarted(false));
				//wait few seconds then hide message
				setTimeout(()=>
					dispatch(unsetSuccessefulyFlag()),3000
				)
			}).catch(e=> {
				dispatch(fUsersFailed(e));
				console.log("ERROR", e);
			});
	}
}

export function deleteUser(userId) {
	return async function(dispatch) {
		dispatch(fUsersStarted(true));
		try {
			let res = await deleteUserReq(userId);
			await dispatch(deleteUserSuccess(res));
			//await dispatch(fUsersStarted(false));
			console.log('dispatch success')
			return res;
		} catch (e) {
			await dispatch(fUsersFailed(e));
			console.log("ERROR", e);
			return e
		}
		/*dispatch(fUsersStarted(true));
		deleteUserReq(userId).then(res => {
			console.log('---DeleteUserback---', res);
			dispatch(deleteUserSuccess(res));
			dispatch(fUsersStarted(false));
			return done()
		}).catch(e=> {
			dispatch(fUsersFailed(e));
			console.log("ERROR", e);
		});*/
	}
}

