let express = require('express');
let router = express.Router();
let User = require('../../models/user.model');
let Course = require('../../models/course.model');
let { auth, permit } = require('../../functions/authentication');

/*
//member to course
//key value hae ke bayad send shavad:
//token , idOfStudent
//id course dar url vared shavad
*/
router.post('/:id', auth, permit('student'), (req, res) => {
    Course.update({ _id: req.params.id }, { $push: { members: req.body.idOfStudent } }).then((course) => {
        User.update({ _id: req.body.id }, { $push: { listOfCourse: req.params.id } }).then((user) => {
        }).catch(error => {
            res.send({
                status: 'error',
                error: err
            });
        });
        res.send({
            status: 'success',
            data: {
                message: "you added to course",
                yourId: req.body.idOfStudent
            }
        });
    }).catch(error => {
        res.send({
            status: 'error',
            error: err
        });
    });


});

//=======================================================================================
module.exports = router;