import { useState, useEffect } from "react";

const Tasks = () => {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/tasks");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks!");
        }
        const jsonData = await response.json();
        setTasks(jsonData);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <ul>
      {tasks &&
        tasks.map((t) => (
          <li key={t._id}>
            <input type="checkbox" id={t._id} className="chk" name="chk" />
            <label htmlFor={t._id} className="card-label">
              <img src="../public/rocket.png" alt="Rocket" className="rocket" />
              {t.title}
            </label>
          </li>
        ))}
    </ul>
  );
};

export default Tasks;
