import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Lista de Compras</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        <div className={styles.title}>
          <h1>Lista de Compras</h1>
        </div>

        <div className={styles.buttons}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Criado por</th>
                <th>Itens</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>João</td>
                <td>Batata, aipim, faca, papel higienico...</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Maria</td>
                <td>Espinafre, frango, Diabo Verde, carne moída...</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Lucas</td>
                <td>Saco de lixo, caneta, pão, pasta de dente...</td>
              </tr>
            </tbody>
          </table>
          <Link legacyBehavior href="/NovaLista">
            <a>
              <button>Nova Lista</button>
            </a>
          </Link>
        </div>
      </main>
    </>
  );
}
