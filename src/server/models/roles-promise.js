const db = require("../mydb.js");
const ObjectID = require('mongodb').ObjectID;


/**
* Model method roles
* @param {object} query
* @returns {promise} promise with array of roles or error
*/

module.exports.roles = function(query) {
  return new Promise((resolve, reject)=> {
    db.get().collection('roles').find(query || {}).toArray((err, roles)=> {
      // console.log("all roles DB", roles);
      if (err) {
        reject(new Error(err))
      }
      resolve(roles)
    });
  })
};


/**
* Model method findById
* @param {number} id
* @returns {promise} promise role or error
*/

module.exports.findById = function(id) {
  return new Promise((resolve, reject)=> {
    // console.log("idfromRoles",  id);
    db.get().collection('roles').findOne({_id: ObjectID(id)}, (err, role)=> {
      // console.log("roleFindByID", role); // null if nofing to find
      if (err) {
        reject(new Error(err))
      }
      resolve(role)
    });
  })
};

/**
* Model method addRole
* @param {object} role {role: 'name'}
* @returns {promise} promise role or error
*/

module.exports.addRole = function(role) {
  return new Promise((resolve, reject)=> {
    console.log("start adding role");
    db.get().collection('roles').insertOne(role, (err, role)=> {
      if (err) {
        console.log("error: adding role", err);
        reject(new Error(err));
      }
      console.log("success adding role");
      resolve(role.ops[0]);
    });
  })
};

/**
* Model method updateRole
* @param {object} role with new name id?
* @returns {promise} promise role or error
*/

module.exports.updateRole = function(role) {
  return new Promise((resolve, reject)=> {
    console.log('inside',role);
    const {_id: roleId, ...rest} = role

    db.get().collection('roles').updateOne(
      {_id: ObjectID(roleId)}, {$set: rest}, (err, result)=> {
      console.log('start updating role');
      if (err || !result) {
        reject(new Error(err))
      }

      db.get().collection('roles').findOne(
        {_id: ObjectID(roleId)},
        { _id: 1, role: 1}, (err, role)=> {
          if(err || !role) {
            console.log("error: updated role not found");
            reject(new Error(err))
          }
          else {
            console.log("updated role DB", role);
            resolve(role);
          }
      });
    });
  })
};


/**
* Model method deleteRole
* @param {number} id
* @returns {promise} promise ok or error
*/

module.exports.deleteRole = function(id) {
  return new Promise((resolve, reject)=> {
    db.get().collection('roles').findOne({_id: ObjectID(id)}, (err, role)=> {
      if (err || !role) {
        reject(new Error(err))
      }
      console.log('startDeletingRole');

      db.get().collection('roles').deleteOne({_id: ObjectID(id)}, (err, result)=> {
        if (err) {
          console.log(err);
          reject(new Error(err));
        }
        console.log('successDeletingRole result')
        //or result.deletedCount
        resolve(result.result.ok);
      });
    });
  })
};