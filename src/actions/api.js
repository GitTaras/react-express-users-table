import Auth from '../modules/Auth';

export function passwordChangeReq(password, id, token) {
	console.log('sending change password ', password, id, token);
	const url = 'http://localhost:3001/pub/changepassword'
	const body = {password: password, id: id, token: token};
	return fetch(url, {
		method: 'POST',
		headers: new Headers({
			/*'Content-Type': 'multipart-form-data',*/
			// 'Accept': 'application/json',
			'Content-Type': 'application/json'
		}),
		mode: 'cors',
		body: JSON.stringify(body)
	})
	.then((res) => {
		if (!res.ok) {
				console.log("resopnse status: ", res);
				throw Error(res.statusText);
		}

		return res.json();
	})
	.catch((e) => {
		console.error('cathcing api error', e);
		throw(e);
	});
};


export function passwordResetReq(mail) {
	console.log('sending mail to reset password', mail)
	const url = `http://localhost:3001/pub/passwordreset`

	return fetch(url, {
		method: 'POST',
		headers: new Headers({
			/*'Content-Type': 'multipart-form-data',*/
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}),
		mode: 'cors',
		body: JSON.stringify({email: mail})
	})
	.then((res) => {
		if (!res.ok) {
				console.log("resopnse status: ", res);
				throw Error(res.statusText);
		}

		return res.json();
	})
	.catch((e) => {
		console.error('cathcing api error', e);
		throw(e);
	});
};


export function addDomainReq(domain) {
	console.log('adding domain', domain);
	const token = Auth.getToken();
	const url = 'http://localhost:3001/api/domain'
	return /*(dispatch) =>*/ //{
		// dispatch(fUsersStarted(true));

		fetch(url, {
				method: 'POST',
				headers: new Headers({
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				}),
				mode: 'cors',
				body: JSON.stringify(domain)
		})
		.then((res) => {
				if (!res.ok) {
						console.log("resopnse status: ", res);
						throw Error(res.statusText);
				}

				// dispatch(fUsersStarted(false));
				return res;
		})
		//.then((res) => { if (checkStatus(res)) {res.json()}}) //console.log("rjson", res);
		.then((res) => res.json())
		.then((res) => {console.log('userback', res);
			// dispatch(addDomain(res));
		})
		.catch((e) => { console.log('cathcing', e); /*dispatch(fUsersFailed(e))*/});
	//};
}

export function getDomainsReq() {
	console.log('getting domains', );
	const token = Auth.getToken();
	const url = 'http://localhost:3001/api/domains'
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
						throw Error(res.statusText);
				}


				return res.json();
		})
		.catch((e) => {
			console.log('cathcing', e);
			throw (e);
			//return e;
		});

}

export function getRolesReq() {
	console.log('getting roles');
	const token = Auth.getToken();
	const url = 'http://localhost:3001/api/roles'
		//dispatch(fUsersStarted(true));
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
						throw Error(res.statusText);
				}

				//dispatch(fUsersStarted(false));
				console.log("res!!!!!!!!!!", res);
				return res.json();
		})

		.catch((e) => {
			console.log('cathcing', e);
			//dispatch(fUsersFailed(e));
			throw(e);
			//return e;
		});

}

export function getUserReq(id) {
	console.log('getting user with id:', id);
	const token = Auth.getToken();
	const url = `http://localhost:3001/api/user/${id}`
		//dispatch(fUsersStarted(true));
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
					throw Error(res.statusText);
			}

			console.log("res!!!!!!!!!!", res);
			return res.json();
	})
	.catch((e) => {
		console.log('cathcing', e);
		throw(e);
	});
}

export function addUserReq(user) {
	console.log('adding user', user)
	const token = Auth.getToken()
	const url = 'http://localhost:3001/api/user'

	let FD = new FormData();
	for (const fildName in user) {
		console.log(typeof(fildName))

		if (fildName=='avatar') {
			console.log('!!!!!!fildName', fildName);
			for (const imgNumber in user.avatar) {
				FD.append(fildName, user.avatar[imgNumber])
			}
		} else {
			FD.append(fildName, user[fildName]);
		}
	}

	//console.log('FD', FD)
	// dispatch(fUsersStarted(true));
	return fetch(url, {
		method: 'POST',
		headers: new Headers({
			/*'Content-Type': 'multipart-form-data',*/
			// 'Accept': 'application/json',
			// 'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}),
		mode: 'cors',
		body: FD
	})
	.then((res) => {
		if (!res.ok) {
				console.log("resopnse status: ", res);
				throw Error(res.statusText);
		}

		return res.json();
	})
	.catch((e) => {
		console.log('cathcing', e);
		throw(e);
	});
};

export function updateUserReq(user) {
	console.log('updating user', user);
	const token = Auth.getToken();
	const url = `http://localhost:3001/api/user/${user._id}`

	let FD = new FormData();
	for (const fildName in user) {
		console.log(typeof(fildName))

		if (fildName=='avatar') {
			console.log('!!!!!!fildName', fildName);
			for (const imgNumber in user.avatar) {
				FD.append(fildName, user.avatar[imgNumber])
			}
		} else {
			FD.append(fildName, user[fildName]);
		}
	}

	return fetch(url, {
		method: 'PUT',
		headers: new Headers({
			//'Accept': 'application/json',
			//'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}),
		mode: 'cors',
		body: FD//JSON.stringify(body)
	})
	.then((res) => {
		if (!res.ok) {
				console.log("resopnse status: ", res);
				throw Error(res.statusText);
		}

		return res.json();
	})
	.catch((e) => { console.log('cathcing', e); throw(e);});
}


export function deleteUserReq(id) {
	console.log('deleting user', id, typeof(id));
	const token = Auth.getToken();
	const url = `http://localhost:3001/api/user/${id}`
	return fetch(url, {
				method: 'DELETE',
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
				return res.json();
		})
		.catch((e) => { console.log('cathcing', e); throw(e);/*dispatch(fUsersFailed(e))*/});
	//};
}


