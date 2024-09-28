const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/todo-app', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a schema for the to-do items
const ToDoItemSchema = new mongoose.Schema({
    item: String,
    createdAt: { type: Date, default: Date.now }
});

const ToDoItem = mongoose.model('ToDoItem', ToDoItemSchema);

// API routes

// Get all to-do items
app.get('/todos', async (req, res) => {
    const items = await ToDoItem.find();
    res.json(items);
});

// Add a new to-do item
app.post('/todos', async (req, res) => {
    const newItem = new ToDoItem({ item: req.body.item });
    await newItem.save();
    res.json(newItem);
});

// Delete a to-do item
app.delete('/todos/:id', async (req, res) => {
    const result = await ToDoItem.findByIdAndDelete(req.params.id);
    res.json(result);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
