import api from "./axios";

export const getTasks = () => api.get("/tareas");
export const getTaskById = (id) => api.get(`/tareas/${id}`);
export const createTask = (task) => api.put("/tareas", task); // <-- PUT y plural
export const updateTask = (id, task) => api.put(`/tareas/${id}`, task);
export const disableTask = (id) => api.patch(`/tareas/${id}/disable`);