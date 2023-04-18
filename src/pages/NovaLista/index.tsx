import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";

const LISTA_DE_COMPRAS_INICIAL: any = [];

export default function TelaCriarListaDeCompras() {
  const [listaDeCompras, setListaDeCompras] = useState(
    LISTA_DE_COMPRAS_INICIAL
  );
  const [itemSelecionado, setItemSelecionado] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [valorTotalCarrinho, setValorTotalCarrinho] = useState(0);

  const itensDisponiveisParaCompra: any = [
    { nome: "Arroz", valorUnitario: 5.0 },
    { nome: "Feijão", valorUnitario: 8.0 },
    { nome: "Carne", valorUnitario: 25.0 },
    { nome: "Leite", valorUnitario: 3.5 },
    { nome: "Ovos", valorUnitario: 7.0 },
    { nome: "Pão", valorUnitario: 2.0 },
  ];

  useEffect(() => {
    const valorTotal = listaDeCompras.reduce(
      (acumulador: any, item: any) => acumulador + item.valorTotal,
      0
    );

    setValorTotalCarrinho(valorTotal);
  }, [listaDeCompras]);

  function adicionarItem() {
    const itemExistente = listaDeCompras.find(
      (item: any) => item.nome === itemSelecionado
    );
    if (itemExistente) {
      itemExistente.quantidade += quantidade;
      itemExistente.valorTotal =
        itemExistente.quantidade * itemExistente.valorUnitario;
      setListaDeCompras([...listaDeCompras]);
    } else {
      const novoItem = {
        nome: itemSelecionado,
        quantidade,
        valorUnitario: itemSelecionado
          ? itensDisponiveisParaCompra.find(
              (item: any) => item?.nome === itemSelecionado
            ).valorUnitario
          : 0,
        valorTotal:
          quantidade *
          (itemSelecionado
            ? itensDisponiveisParaCompra.find(
                (item: any) => item?.nome === itemSelecionado
              ).valorUnitario
            : 0),
      };
      setListaDeCompras([...listaDeCompras, novoItem]);
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Criar Nova Lista de Compras</h2>
      <label htmlFor="nomeDaLista">Nome da Lista:</label>
      <input type="text" id="nomeDaLista" />
      <label htmlFor="itemSelecionado">Item:</label>
      <select
        id="itemSelecionado"
        value={itemSelecionado}
        onChange={(e) => setItemSelecionado(e.target.value)}
      >
        <option value="">Selecione um item</option>
        {itensDisponiveisParaCompra?.map((item: any, index: any) => (
          <option key={index} value={item?.nome}>
            {item?.nome}
          </option>
        ))}
      </select>
      <label htmlFor="quantidade">Quantidade:</label>
      <input
        type="number"
        id="quantidade"
        value={quantidade}
        onChange={(e) => setQuantidade(parseInt(e.target.value))}
      />
      <button onClick={adicionarItem}>Adicionar</button>
      <table className={styles.tabela}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Valor Total</th>
          </tr>
        </thead>
        <tbody>
          {listaDeCompras.map((item: any, index: number) => (
            <tr key={index}>
              <td>{item.nome}</td>
              <td>{item.quantidade}</td>
              <td>{item.valorUnitario.toFixed(2)}</td>
              <td>{item.valorTotal.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className={styles.valor}>
        Valor Total do Carrinho: R${valorTotalCarrinho.toFixed(2)}
      </p>
      <button className={styles.btn}>Salvar</button>
    </div>
  );
}
