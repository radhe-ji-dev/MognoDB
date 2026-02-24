const express = require('express');
const router = express.Router();
const taskController = require('../controllers/controller');


router.post('/bulk', taskController.bulkInsertTasks);
router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
