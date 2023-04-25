import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";

export default function CadastroUsuario() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      await axios.post("/api/users/create", {
        name,
        email,
        username,
        password,
      });
      alert("Usuário cadastrado com sucesso!");
      router.push("/users");
    } catch (error) {
      alert("Erro ao cadastrar usuário!");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Cadastro de Usuário</h1>
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
          Usuário:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <div className={styles.divsenha}>
          <label>
            Senha:
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={styles.showPasswordButton}
            >
              {showPassword ? "Esconder" : "Mostrar"}
            </button>
          </label>
        </div>

        <br />
        <button className={styles.botao} type="submit">
          Cadastrar
        </button>
      </form>
    </div>
  );
}
