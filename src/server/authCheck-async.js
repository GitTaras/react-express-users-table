const jwt = require('jsonwebtoken');
const UsersModel = require("./models/users-promise.js");
const RolesModel = require("./models/roles-promise.js");
const config = require("./config");
const util = require('util');

const verify = util.promisify(jwt.verify);

module.exports.authCheck = async (req, res, next) => {
	try {

		if (!req.headers.authorization) {
			return res.status(401).end();
		}
		//token is headers payload sercret
		//console.log('token', req.headers.authorization);
		const token = req.headers.authorization.split(' ')[1];
		console.log('split', token);
	  // decode the token using a secret key-phrase config.jwtSecret
	  // set on client application-type/x-www-form-encoded to pass verifay
		const decoded = await verify(token, config.jwtSecret);
		const userId = decoded.sub;

		const user = await UsersModel.findById(userId);
		req.currentUserId = user._id;

		const result = await RolesModel.findById(user.roleId);
		req.currentUserRole = result.role;
		return.next();
	} catch(e) {
		console.error(`authCheck err: ${e}`);
		return res.status(401).end();
	}
};