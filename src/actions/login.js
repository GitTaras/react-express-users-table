import Auth from '../modules/Auth';
import {push} from 'react-router-redux';
export function loginFailed(e) {
		return {
				type: 'LOGIN_FAILED',
				etext: e
		};
}

export function loginStarted(bool) {
		return {
				type: 'LOGIN_START',
				isLoading: bool
		};
}

export function loginSuccess(resp) {
		return {
				type: 'LOGIN_SUCCESS',
				resp
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

function setHeaders(auth) {
	return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${auth}`
      }
}

export function loginFetch(user) {
	console.log('userifethc',user);
	return (dispatch) => {
		dispatch(loginStarted(true));

		let url = 'http://localhost:3001/auth/login'
		let myheaders = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

 /*   var request = new Request('http://localhost:3001/auth/login', {
      method: 'POST',
      mode: 'no-cors',
      headers: new Headers({
      	'Content-Type': 'application/x-www-form-urlencoded'
        //'Accept': 'application/json',
        //'Content-Type': 'application/json'
      })
    });*/
    const email = user.login;
    const data = {email: email, password: user.password};
    //const email = encodeURIComponent(user.login);
    //const password = encodeURIComponent(user.password);
    //const formData = `email=${email}&password=${password}`;

		// console.log('myheaders', request);
		fetch(url, {
				method: 'POST',
				body: JSON.stringify(data),//formData
				headers: new Headers({'Content-Type': 'application/json'}),
				mode: 'cors'
		})
		.then((res) => {
				if (!res.ok) {
						console.log("resopnse status: ", res);
						throw Error(res.statusText);
				}

				dispatch(loginStarted(false));
				return res;
		})
		//.then((res) => { if (checkStatus(res)) {res.json()}}) //console.log("rjson", res);
		.then((res) => res.json())
		.then((res) => {console.log('userback', res);
			dispatch(loginSuccess(res));
			Auth.authenticateUser(res.token, res.user);
			dispatch(push('/main'));
		})
		.catch((e) => { console.log('cathcing'); dispatch(loginFailed(e))});
	};
}