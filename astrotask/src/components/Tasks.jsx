import { useState, useEffect } from "react";
import axios from "axios";
import Notifications from "./Notifications";
import { IconArrowNarrowRightDashed } from "@tabler/icons-react";
import { IconArrowNarrowDownDashed } from "@tabler/icons-react";

// eslint-disable-next-line react/prop-types
export const Tasks = ({ reload }) => {
  const [tasks, setTasks] = useState(null);
  const [showToast, setShowToast] = useState(null);
  const [showInfo, setShowInfo] = useState(null);

  const toggleInfo = (id) => {
    setShowInfo((prev) => (prev === id ? null : id));
  };

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
              <li key={t._id}>
                <input
                  type="checkbox"
                  id={`chk-${t._id}`}
                  className="chk"
                  name="chk"
                  checked={!!t.completed}
                  onChange={(e) => completedTask(t._id, e.target.checked)}
                />

                <article
                  className="card-content"
                  onClick={() => toggleInfo(t._id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleInfo(t._id);
                    }
                  }}
                >
                  <span className="spark" aria-hidden="true"></span>
                  <img src="../rocket.png" alt="" className="rocket" />
                  <span>{t.title}</span>
                  <button
                    type="button"
                    className="cursor-pointer text-base border-[none]"
                    aria-expanded={showInfo === t._id}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleInfo(t._id);
                    }}
                  >
                    {showInfo === t._id ? (
                      <IconArrowNarrowDownDashed
                        stroke={1}
                        width={20}
                        height={20}
                      />
                    ) : (
                      <IconArrowNarrowRightDashed
                        stroke={1}
                        width={20}
                        height={20}
                      />
                    )}
                  </button>
                </article>

                {showInfo === t._id && (
                  <article className="flex flex-col justify-center text-[#696868] w-full px-3 py-2">
                    <p className="text-center">
                      {t.description || "No hay descripción"}
                    </p>

                    <article className="flex flex-row justify-around font-bold text-shadow-2xs p-2">
                      <h2 className="border-solid border-2 px-2 py-1 rounded-2xl">
                        {t.priority}
                      </h2>
                      <h2 className="border-solid border-2 px-2 py-1 rounded-2xl">
                        {t.dueDate}
                      </h2>
                    </article>
                  </article>
                )}
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
