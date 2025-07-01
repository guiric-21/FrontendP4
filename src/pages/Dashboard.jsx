import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("média");
  const [status, setStatus] = useState("não iniciada");
  const [dueDate, setDueDate] = useState("");
  const [editId, setEditId] = useState(null);
  const [filters, setFilters] = useState({ priority: "", status: "", dueBefore: "", dueAfter: "" });
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const authHeader = () => ({
    headers: { Authorization: `Bearer ${user}` }
  });

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const fetchTasks = async () => {
    let query = [];
    if (filters.priority) query.push(`priority=${filters.priority}`);
    if (filters.status) query.push(`status=${filters.status}`);
    if (filters.dueBefore) query.push(`dueBefore=${filters.dueBefore}`);
    if (filters.dueAfter) query.push(`dueAfter=${filters.dueAfter}`);
    const url = "/tasks" + (query.length ? `?${query.join("&")}` : "");
    try {
      const res = await api.get(url, authHeader());
      setTasks(res.data);
    } catch {
      alert("Erro ao carregar tarefas");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  // Criar ou editar tarefa
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/tasks/${editId}`, { title, description, priority, status, dueDate }, authHeader());
      } else {
        await api.post("/tasks", { title, description, priority, status, dueDate }, authHeader());
      }
      setTitle("");
      setDescription("");
      setPriority("média");
      setStatus("não iniciada");
      setDueDate("");
      setEditId(null);
      fetchTasks();
    } catch {
      alert("Erro ao salvar tarefa");
    }
  };

  // Excluir tarefa
  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir?")) return;
    try {
      await api.delete(`/tasks/${id}`, authHeader());
      fetchTasks();
    } catch {
      alert("Erro ao excluir tarefa");
    }
  };

  // Editar tarefa
  const handleEdit = (task) => {
    setEditId(task._id);
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
    setStatus(task.status);
    setDueDate(task.dueDate ? task.dueDate.slice(0, 10) : "");
  };

  // Limpar edição
  const handleCancelEdit = () => {
    setEditId(null);
    setTitle("");
    setDescription("");
    setPriority("média");
    setStatus("não iniciada");
    setDueDate("");
  };

  // Atualizar filtros
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-800">Minhas Tarefas</h1>
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">Sair</button>
      </div>

      <div className="bg-white rounded-xl shadow p-4 mb-6 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-gray-700 mb-1">Prioridade</label>
          <select name="priority" value={filters.priority} onChange={handleFilterChange} className="border rounded px-2 py-1">
            <option value="">Todas</option>
            <option value="alta">Alta</option>
            <option value="média">Média</option>
            <option value="baixa">Baixa</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Status</label>
          <select name="status" value={filters.status} onChange={handleFilterChange} className="border rounded px-2 py-1">
            <option value="">Todos</option>
            <option value="não iniciada">Não iniciada</option>
            <option value="em andamento">Em andamento</option>
            <option value="finalizada">Finalizada</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Data da entrega antes de</label>
          <input type="date" name="dueBefore" value={filters.dueBefore} onChange={handleFilterChange} className="border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Data da entrega depois de</label>
          <input type="date" name="dueAfter" value={filters.dueAfter} onChange={handleFilterChange} className="border rounded px-2 py-1" />
        </div>
        <button onClick={fetchTasks} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold">Filtrar</button>
        <button onClick={() => setFilters({ priority: "", status: "", dueBefore: "", dueAfter: "" })} className="ml-2 text-gray-600 underline">Limpar</button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 mb-8 max-w-xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">{editId ? "Editar Tarefa" : "Nova Tarefa"}</h2>
        <input
          type="text"
          placeholder="Título da tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="block mb-3 border rounded-lg px-3 py-2 w-full"
        />
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block mb-3 border rounded-lg px-3 py-2 w-full"
        />
        <div className="flex gap-4 mb-3">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full"
          >
            <option value="alta">Alta</option>
            <option value="média">Média</option>
            <option value="baixa">Baixa</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full"
          >
            <option value="não iniciada">Não iniciada</option>
            <option value="em andamento">Em andamento</option>
            <option value="finalizada">Finalizada</option>
          </select>
        </div>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="block mb-4 border rounded-lg px-3 py-2 w-full"
        />
        <div className="flex gap-2">
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg">
            {editId ? "Salvar" : "Criar Tarefa"}
          </button>
          {editId && (
            <button type="button" onClick={handleCancelEdit} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded-lg">
              Cancelar
            </button>
          )}
        </div>
      </form>
      
      <div className="max-w-3xl mx-auto">
        {tasks.length === 0 ? (
          <div className="text-center text-gray-600">Nenhuma tarefa encontrada.</div>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li key={task._id} className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="font-bold text-lg text-green-800">{task.title}</div>
                  <div className="text-gray-600">{task.description}</div>
                  <div className="text-sm mt-1">
                    <span className="mr-2">Prioridade: <span className={`font-semibold ${task.priority === "alta" ? "text-red-600" : task.priority === "média" ? "text-yellow-600" : "text-green-600"}`}>{task.priority}</span></span>
                    <span className="mr-2">Status: <span className="font-semibold">{task.status}</span></span>
                    {task.dueDate && (
                      <span>Entrega: <span className="font-semibold">{new Date(task.dueDate).toLocaleDateString()}</span></span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                  <button
                    onClick={() => handleEdit(task)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg font-semibold"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg font-semibold"
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}