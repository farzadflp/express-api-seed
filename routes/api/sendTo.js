let express = require('express');
let router = express.Router();
let User = require('../../models/user.model');
let { auth, permit } = require('../../functions/authentication');

//teacher  send id of course   to Student
//key value hae ke bayad send shavad:
//token , suggestion
//id student dar url neveshte mishavad
router.post('/:id', auth, permit('teacher'), (req, res) => {
    User.update({ _id: req.params.id }, { $push: { suggestion: req.body.suggestion } }).then((user) => {
        res.send({
            status: 'success',
            data: {
                message: "course successfully send to student",
                suggestSended: req.body.suggestion
            }
        });
    }).catch(error => {
        res.send({
            status:'error',
            error: err 
        });
});

});
//================================================================================================================
module.exports = router;