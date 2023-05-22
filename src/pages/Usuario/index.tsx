import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "./styles.module.scss";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Usuario() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>("http://localhost:3001/users/");
      setUsers(response.data);
    } catch (error) {
      alert("Erro ao buscar usuários!");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Usuários</h1>
      <ul className={styles.lista}>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
      <Link href="/CadastroUsuario">
        <a>
          <button className={styles.botao}>Cadastrar Usuário</button>
        </a>
      </Link>
    </div>
  );
}
