const { Router } = require('express');
const router = Router();

const { handlerPayment, getFeedback } = require('./payments.controller');


router.post('/', handlerPayment);
router.get('/feedback', getFeedback);




module.exports = router; 