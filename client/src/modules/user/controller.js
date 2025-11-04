const ENV = import.meta.env;
const API_URL = `http://${ENV.VITE_API_HOST}:${ENV.VITE_API_PORT}${ENV.VITE_API_BASE}`;

const UserController = {
  // Obtener todos los usuarios
  getAll: async () => {
    try {
      const res = await fetch(API_URL);
      console.log(res);
      
      return await res.json();
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  },

  // Crear usuario
  create: async (user) => {
    try {
      const res = await fetch(`${API_URL}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      return await res.json();
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  },

  // Actualizar usuario
  update: async (id, user) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      return await res.json();
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  },

  // Eliminar usuario
  delete: async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  },
};

export default UserController;
