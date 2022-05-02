/**
 * Main routes file
 */
 const user= require('../api/user');
 const service= require('../api/service');
 const authLocal= require('../auth/local');
 const puchased= require('../api/purchased');
 const payments = require('../payments');
 const chat = require('../api/chat');

 function routes(app) {
   app.use('/api/service', service);
   app.use('/api/user', user);
   app.use('/auth/local', authLocal);
   app.use('/api/purchased', puchased);
   app.use('/payments', payments);
   app.use('/chat', chat);

 }

 module.exports = routes;
