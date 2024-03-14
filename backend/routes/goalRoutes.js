const router = require('express').Router();
const authenticate = require('../middlewares/authenticate');
const { getAllGoals, createGoal, updateGoal, deleteGoal } = require('../controllers/goalController');

router.route('/').get(authenticate, getAllGoals).post(authenticate, createGoal);
router.route('/:id').put(authenticate, updateGoal).delete(authenticate, deleteGoal);

module.exports = router;