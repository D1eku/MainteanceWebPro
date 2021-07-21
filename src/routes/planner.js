const { Router } = require("express");
const router = Router();

const { esPln } = require('../js/auth');
const { planifMenu, sendAssignDatePauta } = require('../controllers/planner.controllers');

router.get('/pln', esPln, planifMenu);
router.post('/calendarizar-pauta-plan', esPln, sendAssignDatePauta)

module.exports = router;