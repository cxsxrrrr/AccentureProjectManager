import api from "./axios";

export const getProjects = () => api.get("/proyectos");