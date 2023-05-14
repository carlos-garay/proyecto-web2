const express = require('express')
const router = express.Router()
const imageController = require('../controllers/image')

router.use(express.static('uploads'));

router.get('/image/:url', imageController.getImage);


module.exports = router