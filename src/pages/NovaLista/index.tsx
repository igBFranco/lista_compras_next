import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.scss";

interface Item {
  nome: string;
  valorUnitario: number;
}

interface ListaDeCompras {
  nomeDaLista: string;
  itemSelecionado: string;
  quantidade: number;
  usuarioId: number;
}

export default function TelaCriarListaDeCompras() {
  const [listaDeCompras, setListaDeCompras] = useState<ListaDeCompras>({
    nomeDaLista: "",
    itemSelecionado: "",
    quantidade: 1,
    usuarioId: 0,
  });
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [itensDisponiveisParaCompra, setItensDisponiveisParaCompra] = useState<
    Item[]
  >([]);
  const [carrinho, setCarrinho] = useState<any[]>([]);
  const [valorTotalCarrinho, setValorTotalCarrinho] = useState(0);

  useEffect(() => {
    fetchUsuarios();
    fetchItensDisponiveisParaCompra();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get("http://localhost:3001/users");
      setUsuarios(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchItensDisponiveisParaCompra = async () => {
    try {
      const response = await axios.get<Item[]>(
        "http://localhost:3001/products"
      );
      setItensDisponiveisParaCompra(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const adicionarItem = () => {
    const itemExistente = carrinho.find(
      (item) => item.nome === listaDeCompras.itemSelecionado
    );
    const itemSelecionado = itensDisponiveisParaCompra.find(
      (item) => item.nome === listaDeCompras.itemSelecionado
    );

    if (itemExistente && itemSelecionado) {
      itemExistente.quantidade += listaDeCompras.quantidade;
      itemExistente.valorTotal =
        itemExistente.quantidade * itemSelecionado.valorUnitario;
      setCarrinho([...carrinho]);
    } else if (itemSelecionado) {
      const novoItem = {
        nome: listaDeCompras.itemSelecionado,
        quantidade: listaDeCompras.quantidade,
        valorUnitario: itemSelecionado.valorUnitario,
        valorTotal: listaDeCompras.quantidade * itemSelecionado.valorUnitario,
      };
      setCarrinho([...carrinho, novoItem]);
    }
  };

  const handleSalvar = async () => {
    try {
      const response = await axios.post("http://localhost:3001/cart/", {
        nomeDaLista: listaDeCompras.nomeDaLista,
        itemSelecionado: listaDeCompras.itemSelecionado,
        quantidade: listaDeCompras.quantidade,
        usuarioId: listaDeCompras.usuarioId,
      });
      console.log(response.data); // Faça o tratamento da resposta conforme necessário
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const valorTotal = carrinho.reduce(
      (acumulador: any, item: any) => acumulador + item.valorTotal,
      0
    );

    setValorTotalCarrinho(valorTotal);
  }, [carrinho]);

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Criar Nova Lista de Compras</h2>
      <label htmlFor="nomeDaLista">Nome da Lista:</label>
      <input
        type="text"
        id="nomeDaLista"
        value={listaDeCompras.nomeDaLista}
        onChange={(e) =>
          setListaDeCompras({ ...listaDeCompras, nomeDaLista: e.target.value })
        }
      />
      <label htmlFor="usuarioId">Usuário Dono da Lista:</label>
      <select
        id="usuarioId"
        value={listaDeCompras.usuarioId}
        onChange={(e) =>
          setListaDeCompras({
            ...listaDeCompras,
            usuarioId: parseInt(e.target.value),
          })
        }
      >
        <option value={0}>Selecione um usuário</option>
        {usuarios.map((usuario) => (
          <option key={usuario.ID} value={usuario.ID}>
            {usuario.name}
          </option>
        ))}
      </select>
      <label htmlFor="itemSelecionado">Item:</label>
      <select
        id="itemSelecionado"
        value={listaDeCompras.itemSelecionado}
        onChange={(e) =>
          setListaDeCompras({
            ...listaDeCompras,
            itemSelecionado: e.target.value,
          })
        }
      >
        <option value="">Selecione um item</option>
        {itensDisponiveisParaCompra.map((item, index) => (
          <option key={index} value={item.nome}>
            {item.nome}
          </option>
        ))}
      </select>
      <label htmlFor="quantidade">Quantidade:</label>
      <input
        type="number"
        id="quantidade"
        value={listaDeCompras.quantidade}
        onChange={(e) =>
          setListaDeCompras({
            ...listaDeCompras,
            quantidade: parseInt(e.target.value),
          })
        }
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
          {carrinho.map((item, index) => (
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
      <button className={styles.btn} onClick={handleSalvar}>
        Salvar
      </button>
    </div>
  );
}
