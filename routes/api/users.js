var express = require('express');
var jwt = require('jsonwebtoken');
var md5 = require('md5');
var router = express.Router();
var Course = require('../../models/course.model');
var User = require('../../models/user.model');
var config = require('../../config');//config mongodb 

var User = require('../../models/user.model');
var {
  auth,
  permit,
  limiter,
  userExist
} = require('../../functions/authentication');

/*
//key value hae ke bayad ersal shavad:
//email, password ,firstname , lastname , username , role
*/

router.post('/signup', limiter(5, 4), userExist, async (req, res) => {
  try {
    let user = new User();
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.username = req.body.username;
    user.role = req.body.role;
    user.email = req.body.email;
    user.password = req.body.password ? md5(req.body.password) : undefined;
    await user.save();
    res.send({
      status: 'success',
      data: {
        message: 'user account created.',
        user: user
      }
    })
  } catch (error) {
    res.send({
      status: 'error',
      error: error
    })
  }
});

router.post('/signin', limiter(2, 5), async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.body.email
    });

    if (!user) {
      return res.send({
        status: 'fail',
        data: {
          message: 'email is incorrect.'
        }
      })
    } else {
      if (!req.body.password || user.password != md5(req.body.password)) {
        return res.send({
          status: 'fail',
          data: {
            message: 'password is incorrect.'
          }
        })
      } else {
        let payload = {
          _id: user._id
        }
        let token = jwt.sign(payload, config.secret_key);
        return res.send({
          status: 'success',
          data: {
            token: token
          }
        })
      }
    }
  } catch (error) {
    return res.send({
      status: 'error',
      error: error
    })
  }
});

router.post('/verify', auth, (req, res) => {
  return res.send({
    status: 'success',
    data: {
      user: req.user
    }
  })
});
/*
//get course for student
//key value hae ke bayad send shavad:
//token 
//student id khod ra dar url vared mikonad
*/
router.post('/:id', auth, permit('student'), (req, res) => {
  User.findById(req.params.id).then((user) => {
      res.send({
        status: 'success',
        data: {
          message: "list of course",
          listOfCourse: user.listOfCourse
        }
      });
  }).catch((error) => {
    res.send({
      status: 'error',
      error: err
    });
  });
});
module.exports = router;