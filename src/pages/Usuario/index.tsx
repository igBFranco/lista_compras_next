// pages/users/index.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function Usuario() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users/read");
      setUsers(response.data);
    } catch (error) {
      alert("Erro ao buscar usuários!");
    }
  };

  return (
    <div>
      <h1>Usuários</h1>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
      <Link legacyBehavior href="/CadastroUsuario">
        <a>
          <button>Cadastrar Usuário</button>
        </a>
      </Link>
    </div>
  );
}
