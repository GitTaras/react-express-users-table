const db = require("../mydb.js");
const ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');
const DomainsModel = require('./domains-promise');
const RolesModel = require('./roles-promise');
const async = require('async');
//const Grid = require('gridfs-stream');
//const mongodb = require('mongodb');
//const config = require('../config.json');
//const crypto = require('crypto');
//const GridFsStorage = require('multer-gridfs-storage');

module.exports.getImage = function (id, cb) {
  //how change from readstream.pipe(res);  to cb?
  db.getGfs().findOne({_id: req.params.id}, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return cb(null, {err: 'No file exists'})
      res.status(404).json({

      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      let buff = new Buffer();
      const readstream = db.getGfs().createReadStream(file.filename);
      readstream.pipe(buff);
      readstream.on('end', ()=> {
        cb(null, buff)
      })
    } else {
      cb({
        err: 'Not an image'
      })
      res.status(404).json({

      });
    }
  });
}


/**
 * Query add user
 * @param user {Object} user data
 * @returns (promise) with added user
 */

module.exports.addUser = function(user) {
  // it's bad and odius write like that
  return bcrypt.hash(user.password, 10).then((hash)=>{
    user.password = hash;

    return new Promise((resolve, reject)=>{
      db.get().collection('users').insertOne(user, (err, result) => {
        if (err || !result) {
          reject(new Error(err))
        } else {

          db.get().collection('users').findOne({_id: ObjectID(result.ops[0]._id)},
          { _id: 1, FirstName: 1, LastName: 1, email: 1,domainId: 1,
          roleId: 1, lastSignIn: 1, primaryId: 1, ImageIds: 1, createdAt: 1}, (err, user) => {
            if (err || !user) {
              reject(new Error(err))
            } else {
              console.log("user", user)
              resolve(user)
            }
          });
        }
      })
    });
  }).catch((err)=> {
    console.error('HASH PROCESS ERROR', err);
    throw(err)
  })
};


/**
 * Query update user password
 * @param userId {ObjectId} ID of user
 * @returns cb(e, user)
 */


module.exports.updateUserPassword = function(userId, newPassword) {
  return bcrypt.hash(newPassword, 10).then((hash)=>{
    return new Promise((resolve, reject)=>{
      console.log('inside update user password',userId, hash);

      db.get().collection('users').updateOne(
      {_id: ObjectID(userId)}, {$set: {password: hash}},
      (err, result)=> {
        console.log('updateOne result', result);

        if (err || !result) {
          console.log("updateOne faling down", err);
          reject(new Error(err))
        } else {

          db.get().collection('users').findOne({_id: ObjectID(userId)},
          { _id: 1, FirstName: 1, LastName: 1, email: 1,domainId: 1,
            roleId: 1, lastSignIn: 1
          },(err, user)=> {
            if (err || !user) {
              reject(new Error(err))
            }
            console.log("user DB", user)
            console.log("DOCUMENTS WAS UPDATED")
            resolve(user)
          });
        }
      });
    })
  }).catch((err)=>{
    console.error('HASH PROCESS ERROR', err);
    throw(err)
  })
};

module.exports.findByEmail = function(email) {
  return new Promise((resolve, reject)=> {
    db.get().collection('users').findOne({email: email}, function(e, user) {
      if (e) {
        console.log(`findByEmail error ${e}`);
        reject(new Error(e));
      }
      console.log('findByEmail success', user);
      resolve(user);
    });
  })
}

/**
 * Query user by id
 * @param userId {ObjectId} ID of user
 * @returns {promise} with e or user
 */

module.exports.findById = function(userId) {
  return new Promise((resolve, reject)=>{

    db.get().collection('users')
    .findOne({_id: ObjectID(userId)},
    {projection: {_id: 1, FirstName: 1,
    LastName: 1, email: 1,domainId: 1,
    roleId: 1, lastSignIn: 1, primaryImage: 1}},
    (e, user)=> {

      if (e || !user) {
        console.log('error in findById', e);
        reject(new Error(e))
      }
      console.log('FindById', user);
      resolve(user);
    })
  })
};

/**
 * Query all users with roles for acl
 *
 * @returns {promise} with e or users
 */

module.exports.getUsersWithRoles = function() {
  return new Promise((resolve, reject)=>{
    console.log("start getUsersWithRoles")
    console.log(db.get());
    db.get().collection('users').find({})
    .toArray((err, users) => {

      if (!err) {
        console.log("getUsersWithRoles find users success", users[0])

        resolve(
          Promise.all(users.map(async (user) => {
            try {
              let result = await RolesModel.findById(user.roleId);
              user.role = result ? result.role : 'user';
              console.log(`result ${result}`);
              return user;
            } catch(e) {
              console.error("getUsersWithRoles: RolesModel error", result, err)
            }
          }))
        );

      } else {
        console.log("getUsersWithRoles error")
        reject(new Error(err))
      }
    })
  })
}

/*  after mongo upgrade
db.users.aggregate([{ $lookup: {from: "roles",localField: "roleId",foreignField: "_id",as: "roles_doc"} }])
db.users.aggregate([{$lookup: {from: 'domains',localField: 'domainId',foreignField: 'domain',as: 'domain'}}])
*/


/*
db.users.aggregate([
 {$match: {login: "l"} }, {$sort: FirstName: 1},
 {$project: {login: 1, email: 1, count: {$add: [1]}}},
 {$group: {_id: null, docs: {$push: "$$ROOT"}, total: {$sum: "$count"}}},
 {$project: {res: {$slice: ['$docs', skip*limit, limit]}, count: "$total"}}
{$limit: 2},
 ])
*/
//Sslice avilable in mongo 3.1.6  but i have just 2.6.12


function countMatchesPromise (str) {
  const findQuery = {};

  if (str.length) {
    let pat = new RegExp(str.toLowerCase(), 'i');
    findQuery.$or = [
        {FirstName: pat},{LastName: pat},
        {email: pat}, {login: pat}, {lastSignIn: pat}
      ]
  }
  //const query1 = {$text: {$search: pat}}
  return new Promise((resolve, reject)=>{
    try {
      db.get().collection('users')
      .find(findQuery)
      .count(function(err, count) {

        console.log("inside result", count);

        if(err) {
          console.log("beffor reject", err)
          reject(new Error(err))
        }

        if (count) {
          resolve(count);
        }
      });
    } catch (e) {
      reject(new Error(e))
    }
  });
};

function searchUsersPromise(str, skip, limit, sort) {

  const findQuery = {};

  if (str.length) {
    let pat = new RegExp(str.toLowerCase(), 'i');
    findQuery.$or = [
      {FirstName: pat},{LastName: pat},
      {email: pat}, {login: pat}, {lastSignIn: pat}
    ];
  }

  const project = { _id: 1, FirstName: 1,
    LastName: 1, email: 1, domainId: 1,
    roleId: 1, lastSignIn: 1, primaryImage: 1
  }

  return new Promise((resolve, reject)=>{
    try {
      db.get().collection('users')
      .find(findQuery).sort(sort).skip(limit*skip)
      .limit(limit).project(project)
      .toArray(function(err, users) {
        //console.log("inside users", users);
        if(err) {
          console.log("beffor reject", err)
          reject(new Error(err))
        }

        if (users) {
          console.log("searchPromise users[0]:",users[0])
          resolve(users);
        }
      });
    } catch (e) {
      reject(new Error(e))
    }
  });
};

async function searchUsersWithDomainAndRolesPromise(str, skip, limit, sort) {
  try {
    let users = await searchUsersPromise(str, skip, limit, sort);

    return Promise.all(users.map(async (user) => {
      try {
        let fns = [
          DomainsModel.findById(user.domainId),
          RolesModel.findById(user.roleId)
        ];

        let [domain, role] = await Promise.all(fns)

        user.domain = domain ? domain.domain : undefined;
        user.role = role ? role.role : undefined;

        return user;
      } catch (e) {
        console.log(`err promise all for users ${user.login}: ${e}`);
        throw e;
      }
    }));

  } catch (e) {
    console.log("search throw", e);
    throw e;
  }
};

module.exports.searchWithCount = async function (str, skip, limit, sort) {
  try {
    let fns = [countMatchesPromise(str), searchUsersWithDomainAndRolesPromise(str, skip, limit, sort)];
    let [totalCount, users] = await Promise.all(fns);
    console.log("then:", totalCount, users);
    return {totalCount, users, page: skip, pageSize: limit};
  } catch (e) {
    console.log(`searchWithCount error: ${e}`);
    throw e;
  }
};

/**
*Check mail unquie
*@param userId {ObjectId} ID of user to check mail for
*@param mail {string} Mail what checking for
*@returns {Object} Object -> `{ unquie }
*>1 return false
*= 1 check id = resutl._id return true
*return true
*/

module.exports.checkMail = function(userId, mail) {
  return new Promise((resolve, reject)=>{

    console.log('argcheckMail:', arguments);
    db.get().collection('users').findOne({email: mail},
    {projection: {_id: 1}},(err, result)=> {
      if (err) {
        reject(new Error(err))
      } else if (!err && result) {
        console.log("checkMail result:", result);

        if (typeof(userId) === "string" && userId.length && userId.length == 24 ) {
          if ( ObjectID(userId).equals(result._id) ) {
            // existing user doesn't change his mail
            resolve({unquie:true})
          }
        }
        //user choosed mail's is already extist
        console.log("user choosed mail's is already extist")
        resolve({unquie: false})
      } else {
        //new user mail's choice is unquie
        console.log("new user mail's choice is unquie")
        resolve({unquie:true})
      }
    })
  })
}


/**
* Compare the passed password with the value in the database. A model method.
* @param {string} password
* @param {string} userHashFromDB hashed password from db
* @returns {object} callback
*/

module.exports.comparePassword = function (password, userHashFromDB) {
  return bcrypt.compare(password, userHashFromDB);
  // console.log("in1", password, userHashFromDB);
  // bcrypt.hash(password, 8, function(err, hash) {
  //   console.log('tocom:', hash);
  // });
};

module.exports.updateUser = function(user) {
  console.log('inside',user)
  const {_id: userId, ...rest} = user

  return new Promise((resolve, reject)=>{

    db.get().collection('users').updateOne(
    {_id: ObjectID(userId)}, {$set: rest},
    (err, result)=>{
      console.log('updateOne')

      if (err) {
        console.log("updateOne error", err)
        reject(new Error(err))
      } else {

        db.get().collection('users').findOne({_id: ObjectID(userId)},
        { _id: 1, FirstName: 1, LastName: 1, email: 1,domainId: 1,
        roleId: 1, lastSignIn: 1}, (err, user)=> {

          if(err || !user) {
            reject(new Error(err))
          }
          console.log("DOCUMENTS WAS UPDATED")
          resolve(user)
        })
      }
    })
  })
};

module.exports.deleteUser = function(id) {
  return new Promise((resolve, reject)=>{

    db.get().collection('users').findOne({_id: ObjectID(id)},
    (err, user)=> {
      if (err || !user) {
        reject(new Error(err))
      } else {
        async.eachSeries(user.ImageIds, (imageId, cb) => {
          console.log('startEach')
          db.getGfs().remove({_id: ObjectID(imageId)},
          (err, gridStore)=> {
            if (err) {
              console.log('err while deleting images', err)
              cb(err, null)
            }
            console.log('deleted image', imageId);
            cb()
          })
        }, ()=> {
          if (!err) {

            console.log('startDeletingUser')
            db.get().collection('users').deleteOne({_id: ObjectID(id)},
            (err, result)=> {
              if (!err) {
                console.log('endDeletingUser')
                resolve(result)
              } else {
                console.log("deleting user error",err)
                reject(new Error(err))
              }
            });
          }
        })
      }
    })
  })
};