const express = require("express");
const cors = require("cors");
const Task = require("./models/task");
const mongoose = require("mongoose");
const app = express();
const PORT = 4000;

// #region DATABASE
// URI de conexión a tu base de datos MongoDB
const uri =
  "mongodb+srv://jess:3HjVUxT8N9X2R197@challengeapp.lndss9q.mongodb.net/todolist";

// Conectar a la base de datos
mongoose
  .connect(uri, {})
  .then(() => {
    console.log("Conexión exitosa a MongoDB");
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB:", error);
  });

//-----------------------------------------------------------------
//Middleware things
app.use(express.json());
app.use(cors())
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

app.post("/addTask", async (req, res) => {
  const newTask = new Task({
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    completed: req.body.completed,
  });
  newTask
    .save()
    .then(() => {
      res.status(200).send("Tarea agregada correctamente");
    })
    .catch((err) => {
      res
        .status(500)
        .send("Error al guardar la tarea en la base de datos", err);
    });
});
