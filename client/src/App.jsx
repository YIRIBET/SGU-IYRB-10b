import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  const API_URL = `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}${import.meta.env.VITE_API_BASE}/users`;

  const getUsers = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setUsers(data.data || []);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { fullname, email, phone };

    try {
      if (editingUser) {
        await fetch(`${API_URL}/${editingUser.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
        setEditingUser(null);
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
      }

      setFullname("");
      setEmail("");
      setPhone("");
      getUsers();
    } catch (error) {
      console.error("Error al guardar usuario:", error);
    }
  };

  const handleEdit = (user) => {
    setFullname(user.fullname);
    setEmail(user.email);
    setPhone(user.phone);
    setEditingUser(user);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      getUsers();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
    setFullname("");
    setEmail("");
    setPhone("");
  };

  return (
    <div className="container-fluid py-5 bg-light min-vh-100">
      <div className="container">
        <h1 className="mb-4 fw-bold">Gestión de Usuarios</h1>

        <div className="row g-4">
          {/* Formulario - Lado Izquierdo */}
          <div className="col-lg-4">
            <div className="card shadow-sm border-0">
              <div className="card-header">
                <h5 className="mb-0">{editingUser ? "Editar Usuario" : "Agregar Usuario"}</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Nombre Completo</label>
                    <input
                      type="text"
                      className="form-control"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Correo Electrónico</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Teléfono</label>
                    <input
                      type="text"
                      className="form-control"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary fw-bold">
                      {editingUser ? "Actualizar" : "Agregar"}
                    </button>
                    {editingUser && (
                      <button type="button" className="btn btn-secondary fw-bold" onClick={handleCancel}>
                        Cancelar
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Tabla - Lado Derecho */}
          <div className="col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-header">
                <h5 className="mb-0">Usuarios Registrados ({users.length})</h5>
              </div>
              <div className="card-body">
                {users.length === 0 ? (
                  <div className="alert alert-info mb-0" role="alert">
                    <strong>Sin datos:</strong> No hay usuarios registrados. Completa el formulario para agregar uno.
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover table-striped mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>ID</th>
                          <th>Nombre</th>
                          <th>Email</th>
                          <th>Teléfono</th>
                          <th className="text-center">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((u) => (
                          <tr key={u.id}>
                            <td className="fw-bold">{u.id}</td>
                            <td>{u.fullname}</td>
                            <td>{u.email}</td>
                            <td>{u.phone}</td>
                            <td className="text-center">
                              <button
                                className="btn btn-sm btn-warning me-2"
                                onClick={() => handleEdit(u)}
                              >
                                ✏️ Editar
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(u.id)}
                              >
                                🗑️ Eliminar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
