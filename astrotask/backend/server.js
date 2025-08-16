/* eslint-disable no-undef */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Task = require("./models/task");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT;

// #region DATABASE
// Conectar a la base de datos
mongoose
  .connect(process.env.URI, {})
  .then(() => {
    console.log("Conexión exitosa a MongoDB");
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB:", error);
  });

//-----------------------------------------------------------------
//Middleware things
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get("/api", (req, res) => {
  res.send("Main Page");
});

app.get("/api/tasks", async (req, res) => {
  try {
    // Utiliza Mongoose para buscar todas las tareas en la base de datos
    const tasks = await Task.find({ completed: false });
    // Devuelve las tareas como respuesta JSON
    res.json(tasks);
  } catch (error) {
    // Si hay un error, devuelve un mensaje de error como respuesta
    res
      .status(500)
      .json({ message: "Error al obtener las tareas de la base de datos" });
  }
});

app.get("/api/donetasks", async (req, res) => {
  try {
    // Utiliza Mongoose para buscar todas las tareas en la base de datos
    const tasks = await Task.find({ completed: true });
    // Devuelve las tareas como respuesta JSON
    res.json(tasks);
  } catch (error) {
    // Si hay un error, devuelve un mensaje de error como respuesta
    res
      .status(500)
      .json({ message: "Error al obtener las tareas de la base de datos" });
  }
});

app.post("/api/addTask", async (req, res) => {
  try {
    const newTask = new Task({
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
      completed: req.body.completed,
    });
    await newTask.save();
    res.status(200).json({ message: "Tarea agregada correctamente" });
  } catch (error) {
    console.error("Error al guardar la tarea en la base de datos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.patch("/api/updateTask/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid id" });

    const updates = {
      completed: req.body.completed,
    };

    const updatedTask = await Task.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error al actualizar la tarea en la base de datos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
