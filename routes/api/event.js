let express = require('express');
let router = express.Router();
let Event = require('../../models/event.model');
let {auth,permit} = require('../../functions/authentication');

/*
// get all Events
//key value hae ke bayad send shavad:
//token
*/
router.get('/' , ( req , res ) =>{
    Event.find({}).then( events  => {
            res.send({
                status:'success',
                data:{
                    event: events
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
//get one Event by id
//key value hae ke bayad send shavad:
//token  
//id Event dar url vared shavad
*/
router.get('/:id' , ( req , res ) => {
    Event.findById(req.params.id , (err , event ) => {
        if (err) {
            return res.send({
                status:'error',
                error: err 
            });
        } else {
            return res.send({
                status:'success',
                data:{
                    event: event
                }
            }); 
        }
    });  
});

/*
//add new course by teacher
//key value hae ke bayad send shavad:
//token , idOfCourse , name , date
*/
router.post('/' , auth , permit('teacher') , ( req , res ) =>{
    let event = new Event(req.body);
    event.save(err => {
        if (err) {
            res.send({
                status:'error',
                error:err 
            });
        } else {
            res.send({
                status:'success',
                data:{
                    message:"event successfully added",
                    id: event._id
                } 
            }); 
        }
    });
});

/*
//remove one Event
//key value hae ke bayad send shavad:
//token
// id course dar url vared shavad
*/
router.delete('/:id' , auth , permit('teacher') , ( req , res ) => {
    Event.findByIdAndRemove(req.params.id).then( event  => {
            res.send({
                status:'success',
                data:{
                    event: event   
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