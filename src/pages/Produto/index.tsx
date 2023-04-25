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
      console.log(error);
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
              <th>Marca</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Data de Validade</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: any) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>R$ {product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.expiration_date}</td>
                <td>{product.description}</td>
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
