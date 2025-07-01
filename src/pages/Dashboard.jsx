// import { useEffect, useState } from "react";
// import api from "../api/api";
// import { useAuth } from "../auth/AuthContext";

// export default function Dashboard() {
//   const [tasks, setTasks] = useState([]);
//   const [title, setTitle] = useState("");
//   const [priority, setPriority] = useState("média");
//   const [status, setStatus] = useState("não iniciada");
//   const [dueDate, setDueDate] = useState("");
//   const { logout } = useAuth();

//   const fetchTasks = () => {
//     api.get("/tasks")
//       .then((res) => setTasks(res.data))
//       .catch(() => alert("Erro ao carregar tarefas"));
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post("/tasks", { title, priority, status, dueDate });
//       setTitle("");
//       setPriority("média");
//       setStatus("não iniciada");
//       setDueDate("");
//       fetchTasks();
//     } catch {
//       alert("Erro ao criar tarefa");
//     }
//   };

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center">
//         <h1 className="text-xl font-bold">Minhas Tarefas</h1>
//         <button onClick={logout} className="bg-red-500 text-white px-2 py-1">Sair</button>
//       </div>

//       <form onSubmit={handleCreate} className="my-4">
//         <input
//           type="text"
//           placeholder="Título da tarefa"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//           className="block mb-2 border p-2 w-full"
//         />
//         <select
//           value={priority}
//           onChange={(e) => setPriority(e.target.value)}
//           className="block mb-2 border p-2 w-full"
//         >
//           <option value="alta">Alta</option>
//           <option value="média">Média</option>
//           <option value="baixa">Baixa</option>
//         </select>
//         <select
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           className="block mb-2 border p-2 w-full"
//         >
//           <option value="não iniciada">Não iniciada</option>
//           <option value="em andamento">Em andamento</option>
//           <option value="finalizada">Finalizada</option>
//         </select>
//         <input
//           type="date"
//           value={dueDate}
//           onChange={(e) => setDueDate(e.target.value)}
//           className="block mb-2 border p-2 w-full"
//         />
//         <button type="submit" className="bg-green-500 text-white px-4 py-2">Criar Tarefa</button>
//       </form>

//       <ul className="mt-4">
//         {tasks.map((task) => (
//           <li key={task._id} className="border-b py-2">
//             <strong>{task.title}</strong> - {task.status} - prioridade: {task.priority}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }