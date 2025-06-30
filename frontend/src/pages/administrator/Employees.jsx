import React, { useEffect, useState } from "react";
import { authService } from "../../services/authService"; // Importar el servicio de auth
import api from "../../services/axios"; // Usar la instancia configurada de axios
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import "../../stylesheets/page.css";

// Opciones de filtro
const roles = ["All", "Admin", "Manager", "Customer"];
const statuses = ["All", "Active", "Inactive"];
const genders = ["All", "M", "F"];
const categories = ["All", "Developer", "Designer", "Analyst"];

// Traducción de roles y estado para UI
const roleToEN = (role) => {
  switch (role) {
    case "Administrador":
      return "Admin";
    case "Gerente":
      return "Manager";
    case "Cliente":
      return "Customer";
    default:
      return role;
  }
};

const statusToEN = (estado) =>
  estado === "Activo" ? "Active" : estado === "Inactivo" ? "Inactive" : estado;

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados de filtros
  const [role, setRole] = useState("All");
  const [status, setStatus] = useState("All");
  const [gender, setGender] = useState("All");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  // Verificar autenticación al cargar el componente
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      // Si no está autenticado, redirigir al login
      window.location.href = '/login';
      return;
    }
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Verificar que el usuario esté autenticado
      if (!authService.isAuthenticated()) {
        throw new Error('No authenticated');
      }

      // Usar la instancia de axios configurada que incluye automáticamente el token
      // Asumiendo que el endpoint para empleados es '/empleados' o '/employees'
      const response = await api.get('/usuario'); // Ajusta la ruta según tu API
      
      const employeesFromApi = response.data;
      const formattedEmployees = employeesFromApi.map((emp) => ({
        id: emp.empleadoId || emp.usuarioId,
        nombre: emp.nombre,
        apellido: emp.apellido,
        email: emp.email,
        numeroTelefono: emp.numeroTelefono,
        cedula: emp.cedula,
        genero: emp.genero,
        fechaNacimiento: emp.fechaNacimiento,
        estado: emp.estado,
        fechaCreacion: emp.fechaCreacion,
        ultimoAcceso: emp.ultimoAcceso,
        rol: emp.rol || emp.rolUsuario || null,
        // Categoría: puede venir como objeto, string o array (tomar el primer nombre si es array de objetos)
        category: Array.isArray(emp.categoria)
          ? (emp.categoria[0]?.nombre || emp.categoria[0] || "Developer")
          : (emp.categoria && emp.categoria.nombre)
            ? emp.categoria.nombre
            : (emp.categoria || emp.category || "Developer"),
        // Skills: puede venir como array de objetos, strings o anidado en categoria
        skills: Array.isArray(emp.habilidades)
          ? emp.habilidades.map(h => h.nombre || h.skillName || h)
          : (Array.isArray(emp.skills) ? emp.skills.map(s => s.nombre || s.skillName || s) :
            (emp.categoria && Array.isArray(emp.categoria.skills))
              ? emp.categoria.skills.map(s => s.nombre || s.skillName || s)
              : []),
        departamento: emp.departamento,
        puesto: emp.puesto,
        salario: emp.salario,
      }));
      
      setEmployees(formattedEmployees);
    } catch (err) {
      console.error("Error loading employees:", err);
      
      // Manejo específico de errores
      if (err.response?.status === 401) {
        // Token expirado o inválido - el interceptor ya maneja esto
        setError("Session expired. Please login again.");
        authService.logout();
      } else if (err.response?.status === 403) {
        setError("You don't have permission to view employees.");
      } else if (err.message === 'No authenticated') {
        setError("Please login to continue.");
        authService.logout();
      } else {
        setError("Error loading employees. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Filtrado según los select y el search
  const filtered = employees.filter((emp) => {
    // Para buscar por nombre y apellido
    const fullName = `${emp.nombre} ${emp.apellido}`.toLowerCase();
    const roleName = emp.rol?.nombre || "";
    const translatedRole = roleToEN(roleName);
    const translatedStatus = statusToEN(emp.estado);
    
    return (
      (role === "All" || translatedRole === role) &&
      (status === "All" || translatedStatus === status) &&
      (gender === "All" || emp.genero === gender) &&
      (category === "All" || emp.category === category) &&
      (
        fullName.includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase()) ||
        emp.cedula.toString().includes(search.toLowerCase())
      )
    );
  });

  // Formatea la fecha al estilo DD/MM/YYYY
  const formatDate = (str) =>
    str ? new Date(str).toLocaleDateString("en-GB") : "-";

  // Traduce género para UI
  const genderDisplay = (g) =>
    g === "M" ? "Male" : g === "F" ? "Female" : "Other";

  // Función para refrescar la lista de empleados
  const handleRefresh = () => {
    loadEmployees();
  };

  return (
    <div className="admin-page h-full flex flex-col">
      <Topbar title="Employees">
        <TopControls
          module="employees"
          search={search}
          setSearch={setSearch}
          role={role}
          setRole={setRole}
          roles={roles}
          status={status}
          setStatus={setStatus}
          statuses={statuses}
          gender={gender}
          setGender={setGender}
          genders={genders}
          category={category}
          setCategory={setCategory}
          categories={categories}
          onRefresh={handleRefresh} // Agregar botón de refresh si existe
        />
      </Topbar>

      <div className="admin-content h-full flex-1 p-0">
        <div className="overflow-x-auto h-full w-full min-h-[70vh] py-8 px-10">
          {isLoading ? (
            <div className="text-center text-gray-500 py-4">
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                Loading employees...
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
                <div className="flex items-center justify-center gap-2 text-red-600 mb-2">
                  <span className="material-icons">error</span>
                  <span className="font-semibold">Error</span>
                </div>
                <p className="text-red-600 text-sm">{error}</p>
                <button 
                  onClick={handleRefresh}
                  className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <table className="w-full bg-white rounded-2xl shadow-xl border-separate border-spacing-y-2 min-w-[900px]">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">ID Number</th>
                  <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">Gender</th>
                  <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">Birthdate</th>
                  <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">Category & Skills</th>
                  <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((emp, idx) => (
                  <tr
                    key={emp.id}
                    className={`cursor-pointer transition ${idx % 2 === 1 ? "bg-gray-50" : ""} hover:bg-purple-50`}
                  >
                    {/* USER NAME */}
                    <td className="py-5 px-6 whitespace-nowrap font-semibold flex items-center gap-2">
                      <span className="inline-block rounded-full bg-gray-200 p-2">
                        <svg width="28" height="28" fill="none">
                          <circle cx="14" cy="14" r="12" stroke="#888" strokeWidth="2" />
                          <circle cx="14" cy="12" r="5" stroke="#888" strokeWidth="2" />
                          <ellipse cx="14" cy="19" rx="7" ry="4" stroke="#888" strokeWidth="2" />
                        </svg>
                      </span>
                      <div>
                        <span className="font-bold text-base">{emp.nombre} {emp.apellido}</span>
                      </div>
                    </td>
                    {/* CONTACT */}
                    <td className="py-5 px-6 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1 text-gray-800 text-sm">
                          <span className="material-icons text-base text-gray-500">mail</span>
                          {emp.email}
                        </span>
                        <span className="flex items-center gap-1 text-gray-800 text-sm">
                          <span className="material-icons text-base text-gray-500">phone</span>
                          {emp.numeroTelefono}
                        </span>
                      </div>
                    </td>
                    {/* ID NUMBER */}
                    <td className="py-5 px-6 whitespace-nowrap text-gray-800 text-sm">{emp.cedula}</td>
                    {/* GENDER */}
                    <td className="py-5 px-6 whitespace-nowrap text-gray-800 text-sm">{genderDisplay(emp.genero)}</td>
                    {/* BIRTHDATE */}
                    <td className="py-5 px-6 whitespace-nowrap text-gray-800 text-sm">{formatDate(emp.fechaNacimiento)}</td>
                    {/* CATEGORY & SKILLS */}
                    <td className="py-5 px-6 whitespace-nowrap">
                      <div className="font-semibold text-sm mb-1">{emp.category}</div>
                      <div className="flex flex-wrap gap-1">
                        {emp.skills && emp.skills.length > 0 ? (
                          emp.skills.slice(0, 3).map((skill, index) => (
                            <span
                              key={index}
                              className="bg-gray-200 rounded px-2 py-1 text-xs font-semibold"
                            >
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 text-xs">No skills listed</span>
                        )}
                        {emp.skills && emp.skills.length > 3 && (
                          <span className="text-gray-500 text-xs">+{emp.skills.length - 3} more</span>
                        )}
                      </div>
                    </td>
                    {/* ROLE */}
                    <td className="py-5 px-6 whitespace-nowrap">
                      <span className="px-3 py-1 rounded-full font-bold text-xs bg-purple-100 text-purple-700">
                        {roleToEN(emp.rol?.nombre)}
                      </span>
                    </td>
                    {/* STATUS */}
                    <td className="py-5 px-6 whitespace-nowrap">
                      <span
                        className={`px-4 py-1 rounded-full font-bold text-sm ${
                          statusToEN(emp.estado) === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {statusToEN(emp.estado)}
                      </span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && !isLoading && !error && (
                  <tr>
                    <td colSpan={8} className="text-center py-10 text-gray-400">
                      <div className="flex flex-col items-center gap-2">
                        <span className="material-icons text-4xl text-gray-300">people_outline</span>
                        <span>No employees found.</span>
                        <button 
                          onClick={handleRefresh}
                          className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                        >
                          Refresh
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Employees;