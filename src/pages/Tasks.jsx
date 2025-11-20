import { useState, useEffect } from "react";
import { Loading } from "../components/Loading";
import { useForm } from "../hooks/useForm";

export const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { form, setForm, handleChange, handleReset } = useForm({
    title: "",
    description: "",
    is_completed: false,
  });

  const [idToEdit, setIdToEdit] = useState(null);

  const fetchTasks = async () => {
    if (tasks.length === 0) {
      setLoading(true);
    }

    try {
      const res = await fetch("http://localhost:3000/api/tasks-by-user", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setTasks(data.tasks || (Array.isArray(data) ? data : []));
      } else {
        console.error("Error al obtener las tareas");
        setTasks([]);
      }
    } catch (error) {
      console.error(error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (idToEdit) {
      handleUpdateTask();
    } else {
      handleCreateTask();
    }
  };

  const handleSelectEdit = (task) => {
    setIdToEdit(task.id);
    setForm({
      title: task.title,
      description: task.description,
      is_completed: task.is_completed,
    });
  };

  const handleCancelEdit = () => {
    setIdToEdit(null);
    handleReset();
  };

  const handleCreateTask = async () => {
    if (!form.title || !form.description) {
      alert("El título y la descripción son obligatorios");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      if (res.ok) {
        alert("¡Tarea creada exitosamente!");
        handleReset();
        fetchTasks();
      } else {
        const data = await res.json();
        alert(data.message || "Error al crear la tarea");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión al crear la tarea");
    }
  };

  const handleUpdateTask = async () => {
    if (!form.title || !form.description) {
      alert("El título y la descripción son obligatorios");
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${idToEdit}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("¡Tarea actualizada exitosamente!");
        handleCancelEdit();
        fetchTasks();
      } else {
        const data = await res.json();
        alert(data.message || "Error al actualizar la tarea");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión al actualizar la tarea");
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        alert("Tarea eliminada exitosamente");
        fetchTasks();
      } else {
        const data = await res.json();
        alert(data.message || "Error al eliminar la tarea");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión al eliminar la tarea");
    }
  };

  return (
    <div className="container py-5">
      <div className="row">
        {/* Formulario para crear y editar */}
        <div className="col-md-4 mb-4">
          <h2 className="mb-4">{idToEdit ? "Editar" : "Crear"} Tarea</h2>

          <div className="card shadow-sm">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Título <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Ej: Comprar leche"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Descripción <span className="text-danger">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Detalles de la tarea..."
                    className="form-control"
                    required
                  ></textarea>
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    id="is_completed"
                    name="is_completed"
                    checked={form.is_completed}
                    onChange={handleChange}
                    className="form-check-input"
                  />
                  <label htmlFor="is_completed" className="form-check-label">
                    Marcar como completada
                  </label>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  {idToEdit ? "Actualizar Tarea" : "Guardar Tarea"}
                </button>

                {idToEdit && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="btn btn-secondary w-100 mt-2"
                  >
                    Cancelar Edición
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Lista de Tareas */}
        <div className="col-md-8">
          <h2 className="mb-4">Mis Tareas</h2>

          <div className="card shadow-sm" style={{ minHeight: "300px" }}>
            <div className="card-body">
              {loading && <Loading />}

              {!loading && (
                <>
                  {tasks.length === 0 ? (
                    <p className="text-center text-muted pt-5">
                      Aún no tienes tareas. ¡Añade una!
                    </p>
                  ) : (
                    <div className="list-group">
                      {tasks.map((task) => (
                        <div
                          key={task.id}
                          className="list-group-item d-flex justify-content-between align-items-start"
                        >
                          <div className="flex-grow-1">
                            <h5
                              className={`mb-1 ${
                                task.is_completed
                                  ? "text-decoration-line-through text-muted"
                                  : ""
                              }`}
                            >
                              {task.title}
                            </h5>
                            <p
                              className={`mb-0 ${
                                task.is_completed
                                  ? "text-decoration-line-through text-muted"
                                  : "text-secondary"
                              }`}
                            >
                              {task.description}
                            </p>
                          </div>
                          <div className="d-flex gap-2">
                            <button
                              onClick={() => handleSelectEdit(task)}
                              className="btn btn-sm btn-warning"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDelete(task.id)}
                              className="btn btn-sm btn-danger"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
