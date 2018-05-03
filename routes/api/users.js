var express = require('express');
var jwt = require('jsonwebtoken');
var md5 = require('md5');
var router = express.Router();

var config = require('../../config');

var User = require('../../models/user.model');
var {
  auth,
  permit,
  limiter,
  userExist
} = require('../../functions/authentication');

router.post('/signup', limiter(5, 3), userExist, async (req, res) => {
  try {
    let user = new User();
    user.email = req.body.email;
    user.password = req.body.password ? md5(req.body.password) : undefined;
    await user.save();
    res.send({
      status: 'success',
      data: {
        message: 'user account created.'
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
module.exports = router;