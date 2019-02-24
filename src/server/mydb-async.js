const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient
const Grid = require('gridfs-stream');

const state = {
  db: null,
  gfs: null,
}

exports.connect = (url) => {
  try {
    if (state.db) return Promise.resolve();

    return new Promise((resolve, reject) => {
      MongoClient.connect(url, function(e, client) {
        if(!e) {
          const db = client.db('userAdminDB');
          const gfs = Grid(db, mongo);
          state.db = db;
          state.gfs = gfs;
          console.log('conection...', state.db)
          resolve();
        }
        reject(new Error(e));
      });
    })
  } catch(e) {
    console.log(`db connect error: ${e}`)
    throw e;
  }
}

exports.getGfs = () => {
  //console.log('calling getGFS');
  return state.gfs
}

exports.get = () => {
  console.log('calling get', state.db);
  return state.db;
}

exports.close = () => {
  try {
    return new Promise(()=>{
      if (state.db) {
        state.db.close(function(e, result) {
          if (e) {
            reject(new Error(e));
          }
          state.db = null
          state.gfs = null
          resolve();
        })
      }
      reject(new Error(`db instance dosn't exist`))
    })
  } catch(e) {
   console.log(`db close e: ${e}`)
   throw e;
  }
}