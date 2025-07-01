import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { username, password });
      alert("Cadastro feito com sucesso!");
      navigate("/");
    } catch (err) {
      alert("Erro ao cadastrar: " + (err?.response?.data?.message || "Tente novamente mais tarde"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-green-700">Cadastro</h1>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="username">
            Usuário
          </label>
          <input
            id="username"
            type="text"
            placeholder="Digite seu usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            autoComplete="username"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-1" htmlFor="password">
            Senha
          </label>
          <input
            id="password"
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            autoComplete="new-password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors"
        >
          Cadastrar
        </button>
        <div className="mt-6 text-center text-gray-600">
          Já tem cadastro?{" "}
          <Link
            to="/"
            className="text-green-600 hover:underline font-semibold"
          >
            Clique aqui para fazer login
          </Link>
        </div>
      </form>
    </div>
  );
}