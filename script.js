const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/student_tasks', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Task model
const Task = mongoose.model('Task', {
    courseId: String,
    taskName: String,
    dueDate: Date,
    details: String
});

// Express route to add a task
app.post('/tasks', async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Express route to retrieve tasks for a specific course
app.get('/courses/:courseId/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({ courseId: req.params.courseId });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
