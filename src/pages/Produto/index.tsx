// pages/products/index.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "./styles.module.scss";

export default function Produto() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products/read");
      setProducts(response.data);
    } catch (error) {
      setProducts([{ id: "Erro", name: "Erro", price: "Erro" }] as any); // Adiciona um objeto "Erro" à lista de produtos
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Produtos</h1>
      {products.length > 0 ? ( // Verifica se há produtos para exibir
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: any) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>R$ {product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Desculpe, não foi possível encontrar nenhum produto.</p>
      )}
      <Link legacyBehavior href="/CadastroProduto">
        <a>
          <button className={styles.button}>Cadastrar Produto</button>
        </a>
      </Link>
    </div>
  );
}
