// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/api";
// import { useAuth } from "../auth/AuthContext";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post("/auth/login", { username, password });
//       login(res.data.token);
//       navigate("/dashboard");
//     } catch (err) {
//       alert("Erro ao fazer login");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4">
//       <h1 className="text-xl font-bold">Login</h1>
//       <input
//         type="text"
//         placeholder="Usuário"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         className="block mb-2 border p-2"
//       />
//       <input
//         type="password"
//         placeholder="Senha"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="block mb-2 border p-2"
//       />
//       <button type="submit" className="bg-blue-500 text-white px-4 py-2">Entrar</button>
//     </form>
//   );
// }