import Auth from '../modules/Auth';
import {push} from 'react-router-redux';
import {getDomainsReq, getRolesReq} from './api';


/*change name to fetchFailed
&& fetchStart*/
export function fUsersFailed(e) {
	console.log('ERROR', typeof(e.toString()));
		return {
				type: 'FUSERS_FAILED',
				etext: e.toString()
		};
}

export function fUsersStarted(bool) {
		return {
				type: 'FUSERS_START',
				isLoading: bool
		};
}

export function fUsersSuccess(res) {
		return {
				type: 'FUSERS_SUCCESS',
				users: res.result.users,
				message: res.message,
				nextPage: res.result.nextPage,
				page: res.result.page,
				pageSize: res.result.pageSize,
				totalCount: res.result.totalCount,
				roles: res.result.roles,
				domains: res.result.domains,
		};
}

export function deleteUser(res) {
		return {
				type: 'DELETE_USER',
				id: res.id
		};
}

export function updateUser(res) {
		return {
				type: 'UPDATE_USER',
				user: res.user
		};
}

export function addUser(res) {
		return {
				type: 'ADD_USER',
				user: res.user
		};
}

export function addDomain(res) {
		return {
				type: 'ADD_USER',
				domain: res.domain
		};
}


// assign to domain
export function assignToDomainAssign(res) {
		return {
				type: 'ADD_USER',
				domain: res.domain
		};
}

export function updateDomains(domains) {
	return {
			type: 'UPDATE_DOMAINS',
			domains: domains
	};
}

export function updateRoles(roles) {
	return {
			type: 'UPDATE_ROLES',
			roles: roles
	};
}




export function updateRolesAndDomains() {
	/**
	*Gett all domains from server or get it from store?
	*Synchonization for many users when one add new a doman?
	*getDom and getRole need to be async await
	*
	*/

	return async function(dispatch) {
		dispatch(fUsersStarted(true));
		try {
				let [domains, roles] = await Promise.all([
					getDomainsReq(),
					getRolesReq()
				]);
				dispatch(updateDomains(domains));
				dispatch(updateRoles(roles));
				console.log('domainsback', domains);
			} catch (e) {
				dispatch(fUsersStarted(false));
				dispatch(fUsersFailed(e));
				console.log("ERRORTIME", e);
			}
	};
}

// move it to API module
export function checkMailUnquieReq(mail, userId) {
	//console.log('TYPEOF:',typeof(mail));

	console.log('chacking unquie of mail');
	//console.log('arg', arguments);
	const token = Auth.getToken();
	const url = `http://localhost:3001/api/checkmail/${mail}/${userId}`;
			// const url = `http://localhost:3001/api/users?text=Taras Mike&
		// skip=${skip}&limit=${limit}&sort_by=acs:login,desc:FirstName
	return fetch(url, {
			method: 'GET',
			headers: new Headers({
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}),
			mode: 'cors'
	})
	.then((res) => {
			if (!res.ok) {
					console.log("resopnse status: ", res);
					throw Error(res.statusText, res.status);
			}
			console.log("fback----:",res);
			return res.json();
	})
	//.then((res) => { if (checkStatus(res)) {res.json()}}) //console.log("rjson", res);
	.catch((e) => {console.log('cathcing', e); throw(e);});
}

export function checkMailUnquie(mail) {
	return checkMailUnquieReq(mail)
	.then((res)=>{
		console.log("back----:",res);
		return res;
	})
	.catch(e=>{
		console.log("cathcing checkMailUnquie", e);
		throw (e);
	});
}


export function logoutCurrentUser() {
	Auth.deauthenticateUser();
	return (dispatch) => {
		dispatch({type: 'LOGOUT_SUCCESS'});
		dispatch(push('/login'));
	};
}

function checkStatus(r) {
	if (r.status === 200) {
		return r;
	} else {
		console.log('fetch status er:', r.status);
		throw new Error(r.statusText);
	}
}

// function setHeaders(auth) {
// 	return {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Authorization': `Bearer ${auth}`
//       }
// }

// query like this
//GET http://api.example.com/resources?offset=0&limit=25&
// sort_by&
// sort_by=acs:fildName,desc:fildName&
// sort_by=desc(fildName)&	//bad
// text=some+search+words&
// how check for security ech filds?

export function fetchUsers(skip=0, limit=5, text="", sort_by="") {
	console.log('fetching users');
	console.log('arg', arguments);
	return (dispatch) => {
		dispatch(fUsersStarted(true));
		// const domains = getDomainsReq().then()
		const token = Auth.getToken();
		const url = `http://localhost:3001/api/users?text=${text}&
		skip=${skip}&limit=${limit}&sort_by=${sort_by}`
		// const url = `http://localhost:3001/api/users?text=Taras Mike&
		// skip=${skip}&limit=${limit}&sort_by=acs:login,desc:FirstName

		fetch(url, {
				method: 'GET',
				headers: new Headers({
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				}),
				mode: 'cors'
		})
		.then((res) => {
				if (!res.ok) {
						console.log("resopnse status: ", res);
						throw Error(res.statusText);
				}

				dispatch(fUsersStarted(false));
				return res;
		})
		//.then((res) => { if (checkStatus(res)) {res.json()}}) //console.log("rjson", res);
		.then((res) => res.json())
		.then((res) => {console.log('userback', res);
			dispatch(fUsersSuccess(res));
		})
		.catch((e) => { console.log('cathcing', e); dispatch(fUsersFailed(e))});
	};
}

export function pageSizeChange(pageSize) {
		return {
				type: 'PAGE_SIZE_CHANGE',
				pageSize: pageSize
		};
}

export function pageNumberChange(page) {
		return {
				type: 'PAGE_NUMBER_CHANGE',
				page: page
		};
}