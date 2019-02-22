import {checkMailUnquieReq} from '../actions/users';

export const asyncV = values => {
	console.log('START ASYNC')
	return checkMailUnquieReq(values.email, values._id)
		.then((res)=>{
			if (!res.unquie) {
				console.log("INSIDE THEN")
				throw {email: 'That email has already taken'}
			}
			// throw {email: }
		})
		.catch(e=>{
			console.log("ASYNC CHECK ERROR");
			throw(e);
		});
};