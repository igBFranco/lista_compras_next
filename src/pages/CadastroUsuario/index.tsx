// pages/users/register.tsx
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function CadastroUsuario() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      await axios.post("/api/users/create", {
        name,
        email,
        password,
      });
      alert("Usuário cadastrado com sucesso!");
      router.push("/users");
    } catch (error) {
      alert("Erro ao cadastrar usuário!");
    }
  };

  return (
    <div>
      <h1>Cadastro de Usuário</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
