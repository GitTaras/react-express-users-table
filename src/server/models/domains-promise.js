const db = require("../mydb.js");
const ObjectID = require('mongodb').ObjectID;


module.exports.findById = function(id) {
  return new Promise((resolve, reject)=>{
    // console.log("idformDomain",  id);
    db.get().collection('domains').findOne({_id: ObjectID(id)}, function(err, domain) {
      // console.log("DEBUG: domainsFindByID DB", domain);  // null if nofing to find
      if (err || !domain) {
        reject(new Error(err));
      }
      resolve(domain);
    });
  });
};

module.exports.addDomain = function(domain) {
  return new Promise((resolve, reject)=> {
    db.get().collection('domains').insertOne(domain, function(err, result) {
      if (err || !result) {
        reject(new Error(err));
      }
      //or just resolve(result.ops[0].domain)
      db.collection('domains').findOne({domain: result.ops[0].domain}, function(err, domain) {
        if (err || !domain) {
          reject(new Error(err));
        }
        resolve(domain);
      });
    });
  })
};

module.exports.domains = function(query) {
  return new Promise((resolve, reject)=> {
    db.get().collection('domains').find(query || {}).toArray(function(err, domains) {
      if(err || !domains) {
        reject(new Error(err));
      }
      resolve(domains);
    });
  })
};