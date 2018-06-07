var express = require('express');
var router = express.Router();

router.use('/api/users' , require('./api/users') );
router.use('/api/courses', require('./api/course') );
router.use('/api/courses/events' , require('./api/event') );
router.use('/api/users/sendTo' , require('./api/sendTo') );
router.use('/api/users/memberTo' , require('./api/memberTo') );

router.all('/', (req, res) => {
  res.send({
    status: 'success'
  })
});

module.exports = router;