const express = require("express");
const router = express.Router();
const userController = require('../contollers/user.controller');

router.get('/subscribe', userController.createUser);
router.get('/', (req, res) => {
    res.json({ "hello": "hiiii" });
});

module.exports = router;