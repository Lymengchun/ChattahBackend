const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/UsersController')
const authenticate = require('../middleware/authenticate')

router.post('/register',AuthController.register)
router.post('/login',AuthController.login)

router.get('/',authenticate,AuthController.index);
router.post('/show',authenticate, AuthController.show);
router.post('/store',authenticate,AuthController.store);
router.post('/update',authenticate,AuthController.update);
router.post('/delete',authenticate,AuthController.destroy);

module.exports = router