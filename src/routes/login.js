const { Router } = require("express");
const router = Router();

const { logging, main } = require('../controllers/login.controller');

router.get('/', main);
router.post('/', logging);

module.exports = router;