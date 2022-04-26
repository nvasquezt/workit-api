const { Router } = require('express');
const { handlerLoginUser, handlerVerifyAccount } = require ('./local.controller');

const router = Router();

router.post('/login', handlerLoginUser);

router.get('/verify-account/:hash', handlerVerifyAccount);

module.exports = router;
