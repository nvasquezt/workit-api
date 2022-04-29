const { Router } = require('express');
const multer = require('multer');
const {
    handlerAllUsers,
    handlerUserById,
    handlerCreateUser,
    handlerDeleteUser,
    handlerUpdateUser
} = require('./user.controller');

const router = Router();

const upload = multer({ dest: './temp' });

router.post('/', upload.single('file'), handlerCreateUser);
router.get('/', handlerAllUsers);
router.get('/:id', handlerUserById);
router.patch('/:id', upload.single('file'), handlerUpdateUser);
router.delete('/:id', handlerDeleteUser);

module.exports = router;
