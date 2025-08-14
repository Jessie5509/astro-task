import { useState } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
export const Modal = ({ modal, closeModal, onTaskAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "low",
    completed: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
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
      if (typeof onTaskAdded === "function") {
        onTaskAdded(response.data);
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="modal">
      <dialog open={modal}>
        <button id="closeModal" onClick={closeModal} disabled={isSubmitting}>
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
            <button
              type="submit"
              className="btn-add-task"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </dialog>
    </main>
  );
};
export default Modal;
