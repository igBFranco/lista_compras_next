import React, { useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event: any) => {
    event.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);
    // Adicione aqui a lógica de autenticação
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
        <Link className={styles.loginButton} href="/">
          <button type="submit" className={styles.loginButton}>
            Entrar
          </button>
        </Link>

        <div className={styles.separator}>OU</div>
        <button className={styles.signupButton}>Cadastre-se</button>
      </form>
    </div>
  );
}

export default Login;
