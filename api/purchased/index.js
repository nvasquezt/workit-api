const { Router } = require('express');

const {
    handlerAllPurchased,
    handlerPurchasedById,
    handlerCreatePurchased,
    handlerDeletePurchased,
    handlerUpdatePurchased
} = require('./purchased.controller');

const router = Router();

router.get('/', handlerAllPurchased);
router.get('/:id', handlerPurchasedById);
router.post('/', handlerCreatePurchased);
router.patch('/:id', handlerUpdatePurchased);
router.delete('/:id', handlerDeletePurchased);


module.exports = router;