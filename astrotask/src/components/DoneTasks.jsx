import { useState, useEffect } from "react";
import axios from "axios";

export const DoneTasks = () => {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/donetasks");
        if (response.status !== 200) {
          throw new Error("Failed to fetch tasks!");
        }
        const jsonData = response.data;
        setTasks(jsonData);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchData();
  }, [tasks]);

  return (
    <main className="pt-[50px]">
      <section>
        <ul>
          {tasks &&
            tasks.map((t) => (
              <li key={t._id}>
                <input type="checkbox" id={t._id} className="chk" name="chk" checked />
                <label htmlFor={t._id} className="card-label">
                  <img src="../rocket.png" alt="Rocket" className="rocket" />
                  {t.title}
                </label>
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
};

export default DoneTasks;
