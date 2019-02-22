const UserModel = require("../models/usersCallbackToPromise.js");
const jwt = require('jsonwebtoken');
const express = require('express');
const router = new express.Router();
const app = require('../server')
const util = require('util');
const Media = require('../models/media.js');
const sign = util.promisify(jwt.sign);
const verify = util.promisify(jwt.verify);
const sendMail = util.promisify(app.mailer.send);

router.get('/health', (req, res)=>{
  res.status(200).json({status: "all ok"})
})

https://stackoverflow.com/questions/44013020/using-promises-with-streams-in-node-js
router.get('/image/:id', async (req, res)=> {
  try {
    console.log('typeof image param', typeof(req.params.id))
    const id = req.params.id

    if (Boolean(id) && (id.length == 12 || id.length == 24)) {
      console.log('gettting image', id)
      let file = await()
      db.getGfs().files.findOne({_id: ObjectID(id)}, (err, file) => {
        // Check if file
        console.log(file)
        if (err || !file || file.length === 0) {
          return res.status(404).json({
            err: 'No file exists'
          });
        }
        // Check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
          // Read output to browser
          const readstream = db.getGfs().createReadStream(file.filename);
          readstream.pipe(res);
        } else {
          res.status(404).json({
            err: 'Not an image'
          });
        }
      });
    } else {
      res.status(404).json({
        err: 'File not exists'
      });
    }
  } catch(e) {
    //todo
  }

});



router.get('/image/:id', (req, res)=> {
  console.log('typeof image param', typeof(req.params.id))
  const id = req.params.id

  if (Boolean(id) && (id.length == 12 || id.length == 24)) {
    console.log('gettting image', id)
  	db.getGfs().files.findOne({_id: ObjectID(id)}, (err, file) => {
      // Check if file
      console.log(file)
      if (err || !file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
      // Check if image
      if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
        // Read output to browser
        const readstream = db.getGfs().createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({
          err: 'Not an image'
        });
      }
    });
  } else {
    res.status(404).json({
      err: 'File not exists'
    });
  }
});

router.post('/passwordreset', async (req, res) => {
  try {
    console.log("Working /passwordreset route", req.body);
    const email = req.body.email.trim();

    if (email !== undefined) {

      const user = await UserModel.users([{ email: email }]);

      if (!user) {
        console.error('User not found');
        return res.status(404)
                .json({error: 'User not found'});
      }

      const payload = {
        id: user._id,
        email: user.email
      }
      //add user created time stamp to password for uniqueness
      const secret = `${user.password}-${user.createdAt}`;
      const token = await sign(payload, secret);
      const link = `http://localhost:3001/resetpassword/${payload.id}/${token}`

      try {
        await sendMail('email', {
          to: user.email, // REQUIRED. This can be a comma delimited string just like a normal email to field.
          subject: 'Test Email', // REQUIRED.
          otherProperty: {
            userName: user.FirtName,
            link: link
          } // All additional properties are also passed to the template as local variables.
        });
        res.send('Email Sent');
      } catch(e) {
        console.log("send mail error: ", err);
          res.send('There was an error sending the email');
          return;
      }

      // Or return link.
      console.log('all ok sending link: ');
      return res.status(200)
        .json({message: `<a href="/resetpassword/${payload.id}/${token}">Reset password</a>`})

    } else {
      console.error('Email address is missing');
      res.status(404).send('Email address is missing.');
    }
  } catch(e) {
    console.error(`passwordreset err: ${e}`);
    res.json(404);
  }
});

router.get('/resetpassword/:id/:token', async (req, res) => {
  try {
    try {
      const user = await UserModel.users([{ _id: ObjectID(req.params.id) }]);
      const secret = `${user.password}-${user.createdAt}`;
    } catch(e) {
      return res.status(404).json({error: 'User not found'});
    }

    try {
      const token = await verify(req.params.token, secret);
      res.redirect(`localhost:3000/reset/${req.params.id}/${req.params.token}`)
    } catch(e) {
      console.error('decode error', e);
      return res.status(500)
        .json({error: 'Internal Server Error'})
    }
  } catch(e) {
    console.error(e);
    res.json(404);
  }
});


router.post('/changepassword', async function(req, res) {
  try {
    const id = req.body.id;
    const token = req.body.token;
    const password = req.body.password;
    if (id && token && password.length>=8) {
      try {
        const user = await UserModel.users([{ _id: ObjectID(id) }]);
      } catch(e) {
        return res.status(404)
            .json({error: 'User not found'});
      }
      //add user created time stamp to password for uniqueness
      const secret = `${user.password}-${user.createdAt}`;

      try {
        const token = verify(req.params.token, secret);
      } catch(e) {
        console.error('decode error', e);
        return res.status(500)
          .json({error: 'Internal Server Error'})
      }

      try {
        await UserModel.updateUserPasswrod(id, password);
      } catch(e) {
        console.error('update error', e);
        return res.status(500)
          .json({error: 'Internal Server Error'})
      }
      //change it to status.json || status.send
      res.send(
        'Your password has been successfully changed.Go to the login page ' +
        '<a href="http://localhost:3001/">Login</a>'
      );
    }else {
      //change it to status.json || status.send
      res.status(404).send(
        '<p>Something missing!!!. Are you sure that you entered correct password. Please go to the ' +
        '<a href="http://localhost:3001/forget">Forget</a>' +
        ' and try again.</p>'
      );
    }
  } catch(e) {
    console.error(e);
  }
});


module.exports = router;