const express = require("express");
const router = express.Router();
const userController = require('../contollers/user.controller');

router.post('/subscribe', subscribe);
router.get('/', (req, res) => {
    res.json({ "hello": "hiiii" });
});

module.exports = router;