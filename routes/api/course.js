let express = require('express');
let router = express.Router();
let Course = require('../../models/course.model');
let {auth,permit} = require('../../functions/authentication');
router.get('/' , ( req , res ) =>{

});
router.post('/' , auth , permit('teacher') , ( req , res ) =>{
    let course = new Course(req.body);
    course.save(err => {
        if (err) {
            res.send({
                status:"error",
                error:err 
        });
        } else {
            res.send({
                status:"success",
                data:{
                    message:"course successfully added"
                } 
        }); 
        }
    })
});


module.exports = router;