let express = require('express');
let router = express.Router();
let Event = require('../../models/event.model');
let {auth,permit} = require('../../functions/authentication');

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
                    message:"event successfully added"
                } 
            }); 
        }
    });
});

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