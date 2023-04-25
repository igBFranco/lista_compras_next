import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";

export default function CadastroProduto() {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      await axios.post("/api/products/create", {
        name,
        brand,
        price,
        quantity,
        expiration_date: expirationDate,
        description,
        user_id: 1, // Você deve substituir este valor pelo ID do usuário logado
      });
      alert("Produto cadastrado com sucesso!");
      router.push("/products");
    } catch (error) {
      alert("Erro ao cadastrar produto!");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cadastro de Produto</h1>
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
          Marca:
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
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
        <label>
          Quantidade:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Data de Validade:
          <input
            type="date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Descrição:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <br />
        <button className={styles.botao} type="submit">
          Cadastrar
        </button>
      </form>
    </div>
  );
}
