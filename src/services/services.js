const Task = require('../models/task');

const createTask = async (data) => {
	return await Task.create(data);
};

const getAllTasks = async () => {
	return await Task.find();
};

const getTaskById = async (id) => {
	return await Task.findById(id);
};

const updateTask = async (id, data) => {
	return await Task.findByIdAndUpdate(id, data, {
		new: true,
		runValidators: true,
	});
};

const deleteTask = async (id) => {
	return await Task.findByIdAndDelete(id);
};

const insertManyTasks = async (tasks) => {
	return await Task.insertMany(tasks);
};

module.exports = {
	createTask,
	getAllTasks,
	getTaskById,
	updateTask,
	deleteTask,
	insertManyTasks,
};
