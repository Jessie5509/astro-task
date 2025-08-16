import { useState, useEffect } from "react";
import axios from "axios";
import Notifications from "./Notifications";

// eslint-disable-next-line react/prop-types
export const Tasks = ({ reload }) => {
  const [tasks, setTasks] = useState(null);
  const [showToast, setShowToast] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/tasks");
        if (response.status !== 200) {
          throw new Error("Failed to fetch tasks!");
        }
        const jsonData = response.data;
        setTasks(jsonData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setShowToast({ type: "error", message: "Failed to load tasks" });
      }
    };
    fetchData();
  }, [reload, tasks]);

  const completedTask = async (id, checked) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === id ? { ...t, completed: checked } : t))
    );
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/updateTask/${encodeURIComponent(id)}`,
        { completed: checked }
      );
      if (response.status !== 200) {
        throw new Error("Failed to update tasks!");
      }
      setShowToast({ type: "success", message: "Successfully Saved!" });
    } catch (error) {
      console.error(error);
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, completed: !checked } : t))
      );
      setShowToast({ type: "error", message: "Error updating task" });
    }
  };

  return (
    <main>
      <section>
        <ul>
          {tasks &&
            tasks.map((t) => (
              //Today
              //Planned or
              //Done
              //Not Done
              <li key={t._id}>
                <input
                  type="checkbox"
                  id={t._id}
                  className="chk"
                  name="chk"
                  checked={!!t.completed}
                  onChange={(e) => completedTask(t._id, e.target.checked)}
                />
                <label htmlFor={t._id} className="card-label">
                  <span className="spark" aria-hidden="true"></span>
                  <img src="../rocket.png" alt="Rocket" className="rocket" />
                  {t.title}
                </label>
              </li>
            ))}
        </ul>
      </section>

      <article>
        <Notifications
          type={showToast?.type}
          message={showToast?.message}
          closeNotification={() => setShowToast(null)}
        />
      </article>
    </main>
  );
};

export default Tasks;
