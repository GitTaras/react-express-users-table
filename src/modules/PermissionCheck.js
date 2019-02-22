import React from 'react';
import {connect} from 'react-redux';

const permissionList = {
	user: ["read", "update", "reset", "suspend"],	//user may update self only
	manager: ["read", "update", "add", "reset", "suspend"],
	admin: ["read", "update", "add", "delete", "reset", "suspend"]
}

const isHim = (userId, id) => {
	return userId === id
}

/*
* Check user permission
* if role user and he want do action with self allow it to him
* else check action in permissionList
* @param {string} action
* @param {string} user role
* @param {string} user id
* @param {string} action user id
* @param {object} children
* @return {object} children if allowed action
*/

const PermissionCheck = ({action , id, userId, userRole, children}) => {
	if (userRole === "user") {
		return isHim(userId, id) && permissionList[userRole].includes(action) && children
	}
	return userRole ? (permissionList[userRole].includes(action) && children) : null
}

const mapStateToProps = (state) => {
  return {
  	userRole: state.currentUser.user.role,
  	userId: state.currentUser.user.id,
  };
};


export default connect(mapStateToProps)(PermissionCheck);