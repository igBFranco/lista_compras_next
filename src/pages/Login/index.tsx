import React, { useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/users/login", {
        username,
        password,
      });

      if (response.data.success) {
        alert("Login bem-sucedido!");
        // Realizar as ações de autenticação necessárias, como armazenar o token ou dados do usuário na aplicação
        router.push("/"); // Redirecionar para a página de dashboard ou outra página desejada após o login
      } else {
        alert("Nome de usuário ou senha incorretos!");
      }
    } catch (error) {
      alert("Erro ao fazer login!");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleLogin}>
        <h1 className={styles.logo}>My Shopping List</h1>
        <input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit" className={styles.loginButton}>
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
