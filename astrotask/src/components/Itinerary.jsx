import { useState, useEffect, useCallback } from "react";
import Tasks from "./Tasks";
import WeatherAPI from "./WeatherAPI"
import DoneTasks from "./DoneTasks";
import Modal from "./Modal";

export const Itinerary = () => {
  const [modal, setModal] = useState(false);
  const [todayDate, setTodayDate] = useState(null);
  const [reloadTasks, setReloadTasks] = useState(0);

  useEffect(() => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const fechaActual = new Date().toLocaleDateString("en-EN", options);
    setTodayDate(fechaActual);
  }, []);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const handleTaskAdded = useCallback((newTask) => {
    setReloadTasks((r) => r + 1);

    setModal(false);

    console.log("Nueva tarea agregada:", newTask);
  }, []);

  return (
    <>
      <main className="m-auto pt-[50px]">
        <section>
          <article className="relative w-[23dvw] h-[80dvh] text-center bg-[#f3f3f3] pb-5 rounded-lg z-10">
            <div className="container-clouds">
              <span className="today-date">{todayDate}</span>
              <article>
                <WeatherAPI />
              </article>
            </div>

            <h1>Interstellar Itinerary</h1>
            <section className="container-tasks">
              <article>
                <h3>Planned</h3>
                <Tasks reload={reloadTasks} />
              </article>
          
              <article>
                <h3>Done</h3>
                <DoneTasks />
              </article>
            </section>

            <button className="new-task" onClick={openModal}>
              +
            </button>
          </article>
        </section>
      </main>
      <article>
        {modal ? (
          <Modal
            modal={modal}
            closeModal={closeModal}
            onTaskAdded={handleTaskAdded}
          />
        ) : null}
      </article>

      <div>
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>
    </>
  );
};

export default Itinerary;
