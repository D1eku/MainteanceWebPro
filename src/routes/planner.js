const { Router } = require("express");
const router = Router();

const { esPln } = require('../js/auth');
const { planifMenu } = require('../controllers/planner.controllers');

router.get('/pln', esPln, planifMenu);


module.exports = router;