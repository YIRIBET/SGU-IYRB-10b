import { useEffect, useState } from "react";
import UserController from "../modules/user/controller";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", email: "", phoneNumber: "" });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await UserController.getAll();
    setUsers(data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id) {
      await UserController.update(form.id, form);
    } else {
      await UserController.create(form);
    }
    setForm({ id: null, name: "", email: "", phoneNumber: "" });
    loadUsers();
  };

  const handleEdit = (user) => {
    setForm(user);
  };

  const handleDelete = async (id) => {
    if (confirm("¿Seguro que deseas eliminar este usuario?")) {
      await UserController.delete(id);
      loadUsers();
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
      <div style={{ marginRight: "50px" }}>
        <h2>{form.id ? "Editar Usuario" : "Agregar Usuario"}</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            placeholder="Nombre completo"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            placeholder="Correo electrónico"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            placeholder="Teléfono"
            value={form.phoneNumber}
            onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
            required
          />
          <button type="submit" style={{ background: "#eb25b0ff", color: "white", border: "none", padding: "8px" }}>
            {form.id ? "Actualizar" : "Guardar"}
          </button>
          {form.id && (
            <button
              type="button"
              onClick={() => setForm({ id: null, name: "", email: "", phoneNumber: "" })}
              style={{ background: "#6b7280", color: "white", border: "none", padding: "8px" }}
            >
              Cancelar
            </button>
          )}
        </form>
      </div>

      <div>
        <h2>Usuarios Registrados</h2>
        <table  cellPadding="10">
          <thead style={{ backgroundColor: "#dd91f0ff" }}>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((u) => (
                <tr key={u.id}>
                  
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.phoneNumber}</td>
                  <td>
                    <button onClick={() => handleEdit(u)} style={{ marginRight: "5px", background: "#e6e7a2ff", color: "black" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-line-icon lucide-pencil-line"><path d="M13 21h8"/><path d="m15 5 4 4"/><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/></svg>
                    </button>
                    <button onClick={() => handleDelete(u.id)}style={{ marginRight: "5px", background: "#e7a2a2ff", color: "black" }}><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No hay usuarios registrados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTable;
