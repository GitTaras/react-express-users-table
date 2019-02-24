#!/usr/bin/env node

let config = require("./config.json");
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
// var cors = require('cors');
let session = require("express-session");
let ACL = require("acl");
let permissionConfig = require('./ext/permissionConfig');
let passport = require('passport');
//let localSignupStrategy = require('./passport/local-signup');
let localLoginStrategy = require('./passport/local-login-async');
let mailer = require('express-mailer');


mailer.extend(app, {
  from: 'taras.sholt@gmail.com',
    host: 'smtp.gmail.com', // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
    auth: {
      user: config.mailUser.login,
      pass: config.mailUser.pass
    }
});

// console.log('before morgan');
app.use(require('morgan')('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// or use cors npm
// https://gist.github.com/nilcolor/816580
// http://johnzhang.io/options-request-in-express or do it like this
app.use(function(req, res, next) {
	console.log("MIDLE", req.method);
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,OPTION');
	res.header("Access-Control-Allow-Headers",	"Authorization, Origin, X-Requested-With, Content-Type, Accept");
	if (req.method === "OPTIONS") {
		console.log('OPTIONS');
		res.sendStatus(200);
	} else {
		console.log('go to next');
		next();
	}
});

app.use(passport.initialize());

passport.use('local-login',localLoginStrategy);

let authCheckMiddleware = require('./authCheck-async').authCheck;
app.use('/api', authCheckMiddleware);
module.exports = app;

//let publicRoutes =require('./routes/pub-async');
let authRoutes = require('./routes/auth');
let apiRoutes = require('./routes/api-async');

//app.use('/pub', publicRoutes)
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

console.log(`before logger`);

const logger = () => {
	return {
		debug: (msg) => {
			console.log( '-DEBUG-', msg );
		}
	}
}

let db = require("./mydb-async.js");
let node_acl = null;

const getUserId = (req) => {
	console.log("middleware working on")
  if (req.currentUserId) {
    return req.currentUserId.toString()
  }
}

/*const connect_n_start = async () => {
  try {*/
    /*let db = await*/ db.connect(config.url)
    .then(()=>{
      console.log("starting ACL", db.get())

      node_acl = new ACL(new ACL.mongodbBackend(db.get(), '_acl'), logger())
      permissionConfig.setRoles(node_acl)
      app.use(node_acl.middleware(5, getUserId))
      console.log("end acl config")
    }).catch((e)=>{console.error(e)});


  /*} catch(e) {
    console.error("db error:", error)
    process.exit(1)
  }*/
/*}*/

/*connect_n_start();*/


app.listen(3001, function() {
  console.log("listen on 3000 port");
});