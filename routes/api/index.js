const router = require('express').Router();
const courseRoutes = require('./userRoutes');
const studentRoutes = require('./thoughtRoutes');

router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes);

module.exports = router;
