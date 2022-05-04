const { Router } = require('express');


const {
  handlerPostChat,
} = require('./chat.controller')

const router =  Router();

router.patch('/:id', handlerPostChat);

module.exports = router;
