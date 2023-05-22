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
      const response = await axios.get("http://localhost:3001/products");
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
            {products.map((product) => (
              <tr key={product.ID}>
                <td>{product.ID}</td>
                <td>{product.Nome}</td>
                <td>{product.Marca}</td>
                <td>R$ {product.Preco}</td>
                <td>{product.Quantidade}</td>
                <td>{product.Data_Validade}</td>
                <td>{product.Descricao}</td>
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
