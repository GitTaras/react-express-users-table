/*
*	TODO
* server side validation and correct status code
*	Do something with error handling try catch
*/
//const Joi = require('joi');
//const faker = require('faker');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const config = require('../config.json');
//const Grid = require('gridfs-stream');
const express = require('express');
const UserModel = require("../models/usersCallbackToPromise.js");
const DomainModel = require("../models/domains-promise.js");
const RolesModel = require("../models/roles-promise.js");
const {toSortObj} = require("../ext/helpers.js");


// create storage engine
const storage = new GridFsStorage({
    url: config.url,
    file: (req, file) => {
    console.log("MIDLREQ: ", req.file);
  	console.log("MIDLFILE: ", file);
  	const filename = new Date().toISOString() + file.originalname
  	return {
          filename: filename,
          //bucketName: 'uploads'
        };
    /*return new Promise((resolve, reject) => {

      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }

        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };

        resolve(fileInfo);
      });
    });*/
  }
});
const upload = multer({ storage })

//const upload = multer({ dest: 'uploads/' })
//.array('avatar', 2);



/**
 * Takes a route handling function and returns a function
 * that wraps it after first checking that the strings in
 * `reserved` are not part of `req.body`. Used for ensuring
 * create and update requests do not overwrite server-generated
 * values.
 */

 //use it like .get(asyncHandler(checkReservedParams(get, "id")))
const checkReservedParams = (routeHandler, ...reserved) => {
  return (req, res, next) => {
    for (let reservedKey of reserved) {
      if (req.body[reservedKey]) {
        return res.status(400).json({
          error: `Cannot specify ${reservedKey} as part of request body`
        });
      }
    }

    routeHandler(req, res, next);
  }
}

/**
 * Takes a route handling function and returns
 * a function that wraps it in a `try/catch`. Caught
 * exceptions are forwarded to the `next` handler.
 */
const asyncHandler = (routeHandler) => {
  return async (req, res, next) => {
    try {
      await routeHandler(req, res, next);
    } catch (e) {
    	res.json(500);
    	console.error(e);
      //next(err);
    }
  }
}


const router = new express.Router();

router.get('/status', (req, res) => {
  res.status(200).json({
    message: "Server ok. You're authorized to see this secret message."
  });
});


/*
*search with index more flexible and faster then skip and limit
const getTourtle = (req, res, next) => {
   var page = req.params.id;
    var minPage = 10 * (page - 1);
    var maxPage = minPage + 10;
    db.collection.find({
         //do your query
    }).min({_id:min_page}).max({_id:max_page});

    res.json(resp); // send response to client
}
*/

/*
*Route for getting info
*about user by his id
*
*/
router.get('/user/:id', asyncHandler(checkReservedParams(async (req, res) => {
	let id = req.params.id
	let user = await UserModel.findById(id)
	if (!user) {
		res.json(404)
	} else {
		res.status(200).json(user)
	}
}, "id")))

// query like this
// GET http://api.example.com/resources?offset=0&limit=25&
// sort_by=acs:fildName,desc:fildName
// sort_by=acs(fildName)&
// sort_by=desc(fildName)&
// text=some+search+words&
// how check for security ech filds?
router.get('/users',  asyncHandler(async (req, res) => {
	console.log("QUERY:", req.query)
	console.log('sort_by', req.query.sort_by)
	console.log(typeof(req.query.sort_by))

	let skip = Number(req.query.skip) ? (/*console.log("TypeOf skip", typeof(req.query.skip)),*/ Number(req.query.skip)): 0
	let limit = Number(req.query.limit) || 5
	let searchStr = req.query.text
	let sort = toSortObj(req.query.sort_by)
	let result = await UserModel.searchWithCount(searchStr, skip, limit, sort)

	res.status(200).json({result: result
		/*nextPage: Math.ceil(totalCount/pageSize) > skip ? skip+1: skip*/
	});

	console.log("All ok", result.totalCount, result.pageSize)
}))

router.post('/user',  upload.array('avatar', 4),/*upload.single('avatar'),*/asyncHandler(async (req, res) => {
	console.log("SERVER BODY: ", req.body)
	console.log("type of ava fild: ", typeof(req.body.avatar))
	console.log("FILES:", req.files, "\nfile:", req.file)

	const ImageIds = []
	//let primaryId
	let user = req.body

	req.files.map((file)=> {
		if (file.originalname === req.body.primaryImage) {
			//primaryId = file.id
			user.primaryImage = file.id//primaryId
		}
		ImageIds.push(file.id)
	})

	user.ImageIds = ImageIds
	user.createdAt = new Date().toLocaleString()

	let newUser = await UserModel.addUser(user)
 	console.log("posted", newUser)
 	res.json(newUser)
}))

router.put('/user/:id', upload.array('avatar', 4), asyncHandler(async (req, res) => {
	console.log("SERVER BODY: ", req.body)
	console.log("SERVER BODY avatar: ", typeof(req.body.avatar))

	let user = req.body

	if (req.files) {
		const ImageIds = []

		req.files.map((file)=> {
			if (file.originalname === req.body.primaryImage) {
				user.primaryImage = file.id//primaryId will be userava
			}
			ImageIds.push(file.id)
		})
		user.ImageIds = ImageIds
	}
	user.updatedAt = new Date().toLocaleString()

	let updatedUser = await UserModel.updateUser(user)
	console.log("putted", updatedUser)
	res.json(updatedUser)
}))


router.delete('/user/:id', asyncHandler(async (req, res) => {
	console.log(req.params)
	let id = req.params.id
	console.log('id', id)

	let result = await UserModel.deleteUser(id)
	//res.json(result);
	res.status(200).json({user: 'ok'})
}))

router.get('/checkmail/:mail/:id', asyncHandler( async(req, res) => {
	// console.log("ckmail:mail", req.params.mail);
	// add validation here!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(String(req.params.email));
	console.log("ckmail:mail", req.params.mail, req.params.id)
	let result = await UserModel.checkMail(req.params.id,req.params.mail)
	res.status(200).json(result);
}))

router.get('/image/:id', function(req, res) {

	gfs.findOne({_id: req.params.id}, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});

router.post('/domain', asyncHandler(async (req, res) => {
		let domain = await DomainModel.addDomain(req.body)
		console.log("domain added");
		res.json(domain);
}))

router.get('/domains', asyncHandler(async (req, res) => {
		let domains = await DomainModel.domains({})
		res.json(domains);
		console.log("domains sended");
}))

router.get('/roles', asyncHandler(async (req, res) => {
		let roles = await RolesModel.roles({})
		res.json(roles);
		console.log("roles sended");
}))

module.exports = router;