const express = require('express');
const router = express.Router();
const { createDirectory, deleteDirectory, listingDirectories } = require('../controllers/fileststemController');

router.route('/create')
    .post(createDirectory);

router.route('/list')
    .post(listingDirectories);

router.route('/delete')
    .post(deleteDirectory);

module.exports = router;