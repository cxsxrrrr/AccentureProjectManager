import api from "./axios";

// Obtener todas las tareas
export const getTasks = () => api.get("/tareas");

// Obtener una tarea por ID
export const getTaskById = (id) => api.get(`/tareas/${id}`);

// Crear una nueva tarea
export const createTask = (task) => api.put("/tareas", task);

// Actualizar una tarea existente
export const updateTask = (task) => api.put("/tareas", task);


// Deshabilitar una tarea
export const disableTask = (id) => api.patch(`/tareas/${id}/disable`);

export const saveTask = (task) => api.put("/tareas", task);