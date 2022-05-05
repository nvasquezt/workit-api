const { Router } = require('express');
const multer = require('multer');
const {
    handlerAllServices,
    handlerServiceById,
    handlerCreateService,
    handlerDeleteService,
    handlerUpdateService,
    handlerSearchServiceById,
    handlerSearchServiceByTitle,
    handlerSearchServiceBySellerId,
    handlerSearchServiceBytag,

} = require('./service.controller');

const { isAuth, hasRole } = require('../../auth/auth.service');

const router = Router();

const upload = multer({ dest: './temp' });


router.post('/',upload.single('file'),isAuth(),handlerCreateService);
router.get('/search/:query',handlerSearchServiceById);
router.get('/search=seller/:sellerId',handlerSearchServiceBySellerId);
router.post('/search=title',handlerSearchServiceByTitle);
router.get('/search=tag/:tag',handlerSearchServiceBytag);
router.get('/', handlerAllServices);
router.get('/:id', handlerServiceById);
router.patch('/:id',upload.single('file'), isAuth(), handlerUpdateService);
router.delete('/:id', isAuth(), handlerDeleteService);


module.exports = router;
