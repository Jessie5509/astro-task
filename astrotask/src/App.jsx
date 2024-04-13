import { useState, useEffect } from "react";
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
              <form id="miFormulario" action="/addTask" method="POST">
                <div className="container-form">
                  <h1>Create a new journey</h1>
                  <div className="form-data">
                    <label htmlFor="title">Task name </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="input-task"
                      required
                    />
                  </div>
                  <div className="form-data">
                    <label htmlFor="description">Description </label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      className="input-task"
                    />
                  </div>
                  <div className="form-data">
                    <label htmlFor="priority">Priority </label>
                    <select
                      type="text"
                      name="priority"
                      id="priority"
                      className="input-task"
                      required
                    >
                      <option value="low">low</option>
                      <option value="medium">medium</option>
                      <option value="high">high</option>
                    </select>
                  </div>
                  <button type="submit" className="btn-add-task">
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
