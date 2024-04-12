import { Schema, model } from "mongoose";

// Definir un esquema para las tareas
const taskSchema = new Schema({
  title: { type: String, default: "Your task" },
  description: { type: String },
  priority: { type: String, enum: ["high", "medium", "low"], default: "low" },
  completed: { type: Boolean, default: false },
});

// Crear el modelo Task
const Task = model("Task", taskSchema);

export default Task;
