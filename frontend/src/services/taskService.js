import api from "./axios";

export const getTasks = () => api.get("http://localhost:8080/api/tareas");
export const getTaskById = (id) => api.get(`http://localhost:8080/api/tareas/${id}`);
export const createTask = (task) => api.put("http://localhost:8080/api/tareas", task); // <-- PUT y plural
export const createTaskFlat = (payload) => api.put("http://localhost:8080/api/tareas", payload); // helper para payload plano
export const updateTask = (id, task) => api.put(`http://localhost:8080/api/tareas/${id}`, task);
export const disableTask = (id) => api.patch(`http://localhost:8080/api/tareas/${id}/disable`);