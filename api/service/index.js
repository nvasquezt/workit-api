const { Router } = require('express');
const multer = require('multer');
const {
    handlerAllServices,
    handlerServiceById,
    handlerCreateService,
    handlerDeleteService,
    handlerUpdateService
} = require('./service.controller');

const { isAuth, hasRole } = require('../../auth/auth.service');

const router = Router();

const upload = multer({ dest: './temp' });


router.post('/',upload.single('file'),isAuth(),handlerCreateService);
router.get('/', handlerAllServices);
router.get('/:id', handlerServiceById);
router.patch('/:id', isAuth(), handlerUpdateService);
router.delete('/:id', isAuth(), handlerDeleteService);


module.exports = router;