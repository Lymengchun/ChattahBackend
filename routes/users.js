const express = require('express')
const router = express.Router();

const UsersController = require('../controllers/UsersController');

router.get('/',UsersController.index);
router.post('/show', UsersController.show);
router.post('/store',UsersController.store);
router.post('/update',UsersController.update);
router.post('/delete',UsersController.destroy);

module.exports = router;