import { useState, useEffect } from "react";
import axios from "axios";
import Tasks from "./components/Tasks";
import "./styles.scss";

const App = () => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "low",
    completed: false,
  });
  const [todayDate, setTodayDate] = useState(null);
  const fechaActual = new Date().toLocaleDateString("en-EN", options);

  useEffect(() => {
    setTodayDate(fechaActual);
  }, []);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const newTask = async (e) => {
    console.log("Form data", formData);
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/addTask",
        formData
      );
      console.log(response.data);
      setFormData({
        title: "",
        description: "",
        priority: "low",
        completed: false,
      });
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <>
      <main>
        <section>
          <article>
            <div className="container-clouds">
              <span className="today-date">{todayDate}</span>
            </div>
            <h1>Interstellar Itinerary</h1>
            <div className="container-tasks">
              <Tasks />
            </div>
            <button className="new-task" onClick={openModal}>
              +
            </button>
          </article>
          <div className="modal">
            <dialog open={modal}>
              <button id="closeModal" onClick={closeModal}>
                x
              </button>
              <form id="miFormulario" onSubmit={newTask}>
                <div className="container-form">
                  <h1>Create a new journey</h1>
                  <div className="form-data">
                    <label htmlFor="title">Task name </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={formData.title}
                      className="input-task"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-data">
                    <label htmlFor="description">Description </label>
                    <textarea
                      type="text"
                      name="description"
                      id="description"
                      value={formData.description}
                      rows="5"
                      cols="33"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-data">
                    <label htmlFor="priority">Priority </label>
                    <select
                      type="text"
                      name="priority"
                      id="priority"
                      value={formData.priority}
                      className="input-task"
                      onChange={handleChange}
                    >
                      <option value="low">low</option>
                      <option value="medium">medium</option>
                      <option value="high">high</option>
                    </select>
                  </div>
                  <button type="submit" className="btn-add-task" onClick={closeModal}>
                    Add
                  </button>
                </div>
              </form>
            </dialog>
          </div>
        </section>
      </main>
      <div>
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>
    </>
  );
};

export default App;
