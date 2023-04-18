// pages/products/create.tsx
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function CadastroProduto() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      await axios.post("/api/products/create", {
        name,
        price,
        user_id: 1, // Você deve substituir este valor pelo ID do usuário logado
      });
      alert("Produto cadastrado com sucesso!");
      router.push("/products");
    } catch (error) {
      alert("Erro ao cadastrar produto!");
    }
  };

  return (
    <div>
      <h1>Cadastro de Produto</h1>
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
          Preço:
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
