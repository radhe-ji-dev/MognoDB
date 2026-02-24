const taskService = require('../services/services');

exports.createTask = async (req, res, next) => {
	try {
		const task = await taskService.createTask(req.body);
		res.status(201).json(task);
	} catch (error) {
		next(error);
	}
};

exports.getAllTasks = async (req, res, next) => {
	try {
		const tasks = await taskService.getAllTasks();
		res.status(200).json(tasks);
	} catch (error) {
		next(error);
	}
};

exports.getTaskById = async (req, res, next) => {
	try {
		const task = await taskService.getTaskById(req.params.id);
		if (!task) {
			return res.status(404).json({ message: 'Task not found' });
		}
		res.status(200).json(task);
	} catch (error) {
		next(error);
	}
};

exports.updateTask = async (req, res, next) => {
	try {
		const task = await taskService.updateTask(req.params.id, req.body);
		if (!task) {
			return res.status(404).json({ message: 'Task not found' });
		}
		res.status(200).json(task);
	} catch (error) {
		next(error);
	}
};

exports.deleteTask = async (req, res, next) => {
	try {
		const task = await taskService.deleteTask(req.params.id);
		if (!task) {
			return res.status(404).json({ message: 'Task not found' });
		}
		res.status(200).json({ message: 'Task deleted successfully' });
	} catch (error) {
		next(error);
	}
};

exports.bulkInsertTasks = async (req, res, next) => {
	try {
		if (!Array.isArray(req.body)) {
			return res.status(400).json({
				message: 'Request body must be an array of tasks',
			});
		}

		const tasks = await taskService.insertManyTasks(req.body);

		res.status(201).json({
			message: 'Tasks inserted successfully',
			count: tasks.length,
			data: tasks,
		});
	} catch (error) {
		next(error);
	}
};
