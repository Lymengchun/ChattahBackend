const express = require('express')
const router = express.Router();

const chatController = require('../controllers/ChatController');
const authenticate = require('../middleware/authenticate')

router.get('/',authenticate,chatController.index);
router.post('/getchat',authenticate,chatController.getchat);
router.post('/getownchat',authenticate,chatController.getownchat);
router.post('/show',authenticate, chatController.show);
router.post('/store',authenticate,chatController.store);
router.post('/update',authenticate,chatController.update);
router.post('/delete',authenticate,chatController.destroy);
router.post('/pushMessages',authenticate,chatController.pushMessage);

module.exports = router;