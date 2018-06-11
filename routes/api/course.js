let express = require('express');
let router = express.Router();
let Course = require('../../models/course.model');
let {auth,permit} = require('../../functions/authentication');
/*
// get all courses
//key value hae ke bayad send shavad:
//token
*/
router.get('/' , ( req , res ) =>{
    Course.find({}).then( courses  => {
            res.send({
                status:'success',
                data:{
                    course: courses
                }
            }); 
        
    }).catch(error => {
            res.send({
                status:'error',
                error: err 
            })
    });
});
/*
//get one course by id
//key value hae ke bayad send shavad:
//token 
//id course dar url vared shavad
*/
router.get('/:id' , ( req , res ) => {
    Course.findById(req.params.id , (err , course ) => {
        if (err) {
            return res.send({
                status:'error',
                error: err 
            });
        } else {
            return res.send({
                status:'success',
                data:{
                    course: course
                }
            }); 
        }
    });  
});

/*
//add new course by teacher
//key value hae ke bayad send shavad:
//token , title
*/
router.post('/' , auth , permit('teacher') , ( req , res ) =>{
    let course = new Course(req.body);
    course.save(err => {
        if (err) {
            res.send({
                status:'error',
                error:err 
            });
        } else {
            res.send({
                status:'success',
                data:{
                    message:"course successfully added",
                    id: course._id
                } 
            }); 
        }
    });
});

/*
//update course by teacher
//key value hae ke bayad send shavad:
//token , title
//id course dar url vared shavad
*/
router.post('/update/:id' , auth , permit('teacher') , ( req , res ) => {
    Course.findByIdAndUpdate(req.params.id , req.body ).then( (course) => {
        res.send({
            status: 'success',
            data: {
                message: "course successfully updated",
                id: course._id,
                previousTitle: course.title,
                newTitle: req.body.title 
            }
        });
    }).catch( (error) => {
        res.send({
            status:'error',
            error: err 
        })
    });
});
/*
//remove one course
//key value hae ke bayad send shavad:
//token
// id course dar url vared shavad
*/
router.delete('/:id' , auth , permit('teacher') , ( req , res ) => {
    Course.findByIdAndRemove(req.params.id).then( course  => {
            res.send({
                status:'success',
                data:{
                    course: course   
                }
            }); 
        
    }).catch(error => {
            res.send({
                status:'error',
                error: err 
            })
    });
});

//=============================================================================================
module.exports = router ;