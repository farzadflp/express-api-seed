let express = require('express');
let router = express.Router();
let Course = require('../../models/course.model');
let {auth,permit} = require('../../functions/authentication');

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
                    message:"course successfully added"
                } 
            }); 
        }
    });
});

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
module.exports = router ;