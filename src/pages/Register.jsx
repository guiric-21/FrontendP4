// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/api";

// export default function Register() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post("/auth/register", { username, password });
//       alert("Cadastro feito com sucesso!");
//       navigate("/");
//     } catch (err) {
//       alert("Erro ao cadastrar");
//     }
//   };

//   return (
//     <form onSubmit={handleRegister} className="p-4">
//       <h1 className="text-xl font-bold">Cadastro</h1>
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
//       <button type="submit" className="bg-green-500 text-white px-4 py-2">Cadastrar</button>
//     </form>
//   );
// }