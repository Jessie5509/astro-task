/* eslint-disable no-undef */
const mongoose = require("mongoose");

// Definir un esquema para las tareas
const taskSchema = new mongoose.Schema({
  title: { type: String, default: "Your task" },
  description: { type: String },
  priority: { type: String, enum: ["high", "medium", "low"], default: "low" },
  completed: { type: Boolean, default: false },
});

// Crear el modelo Task
const Task = mongoose.model("Task", taskSchema);

// export default Task;
module.exports = Task;
