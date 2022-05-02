const { Router } = require('express');


const {
  handlerPostChat,
} = require('./chat.controller')

const router =  Router();

router.post('/', handlerPostChat);

module.exports = router;
