let express = require('express');
let router = express.Router();
let Event = require('../../models/event.model');
let Course = require('../../models/course.model');
let { auth, permit } = require('../../functions/authentication');


/*
//get one Event by id
//key value hae ke bayad send shavad:
//token , idOfCourse , idOfCreator
//id Event dar url vared shavad
*/
router.get('/:id', auth, permit('teacher'), (req, res) => {
    Course.findById(req.body.idOfCourse).then((course) => {
        if (course.idOfCreator == req.idOfCreator) {
            Event.findById(req.params.id).then((event) => {
                res.send({
                    status: 'success',
                    data: {
                        event: event
                    }
                });

            }).catch((error) => {
                res.send({
                    status: 'error',
                    error: err
                });
            });
        } else {
            res.send({
                status: 'unsuccess',
                data:{
                    message: "only Creator of Course can delete event"
                }
            });

        }
    }).catch((error) => {
        res.send({
            status: 'error',
            error: err
        });
    });

});

/*
//add new course by teacher
//key value hae ke bayad send shavad:
//token , idOfCourse , name , date 
*/
router.post('/', auth, permit('teacher'), (req, res) => {
    let event = new Event(req.body);
    event.save(err => {
        if (err) {
            res.send({
                status: 'error',
                error: err
            });
        } else {
            res.send({
                status: 'success',
                data: {
                    message: "event successfully added",
                    id: event._id
                }
            });
        }
    });
});

/*
//remove one Event
//key value hae ke bayad send shavad:
//token , idOfCreator
// id course dar url vared shavad
*/
router.delete('/:id', auth, permit('teacher'), (req, res) => {
    Coues.findById((course) => {
        Event.findByIdAndRemove(req.params.id).then(event => {
            if (course.idOfCreator == req.body.idOfCreator) {
                res.send({
                    status: 'success',
                    data: {
                        event: event
                    }
                });
            } else {
                res.send({
                    status: 'unsuccess',
                    data: {
                        message: "only Creator of Course can delete evet"
                    }
                });
            }
        }).catch(error => {
            res.send({
                status: 'error',
                error: err
            });
        });

    }).then.catch((error) => {
        res.send({
            status: 'error',
            error: err
        });
    });

});
module.exports = router;