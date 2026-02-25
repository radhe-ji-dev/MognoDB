const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

/* =========================
   1️⃣ CONNECT TO MONGODB
========================= */

mongoose
	.connect('mongodb://127.0.0.1:27017/crud_app')
	.then(() => {
		console.log('✅ MongoDB Connected');
	})
	.catch((err) => {
		console.log('❌ MongoDB Connection Error:', err);
    });
    

    

/* =========================
   2️⃣ CREATE TASK SCHEMA
========================= */

const taskSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		completed: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true, // adds createdAt and updatedAt
	},
);

/*
What timestamps: true does?

MongoDB automatically stores:
{
  createdAt: Date,
  updatedAt: Date
}
*/

const Task = mongoose.model('Task', taskSchema);

/* =========================
   3️⃣ CREATE TASK (Optional)
   Just for testing
========================= */

app.post('/tasks', async (req, res) => {
	try {
		const task = await Task.create(req.body);
		res.status(201).json(task);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

/* =========================
   4️⃣ GET ALL TASKS
========================= */

app.get('/tasks', async (req, res) => {
	try {
		const tasks = await Task.find(); // Mongo Query
		res.status(200).json(tasks);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

/*
Task.find()

Equivalent MongoDB Query:
db.tasks.find({})
*/

/* =========================
   5️⃣ GET SINGLE TASK BY ID
========================= */

app.get('/tasks/:id', async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);

		if (!task) {
			return res.status(404).json({ message: 'Task not found' });
		}

		res.status(200).json(task);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

/*
Task.findById(id)

Equivalent MongoDB Query:
db.tasks.findOne({ _id: ObjectId("id") })
*/

/* =========================
   6️⃣ START SERVER
========================= */

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`🚀 Server running on port ${PORT}`);
});
