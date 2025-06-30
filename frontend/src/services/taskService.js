import api from "./axios"; // Ya tienes este helper

export const getTasks = () => api.get("/tarea");
export const getTaskById = (id) => api.get(`/tarea/${id}`);
export const createTask = (task) => api.post("/tarea", task);
export const updateTask = (id, task) => api.put(`/tarea/${id}`, task);
export const disableTask = (id) => api.patch(`/tarea/${id}/disable`);