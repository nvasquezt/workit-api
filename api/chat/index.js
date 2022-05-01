const { Router} = require('express');

const {
  handlerPostChat,
} = require('./chat.controller')

const routes =  Router();

router.post('/', handlerPostChat);

module.exports = routes;
