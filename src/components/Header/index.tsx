// components/Navbar.tsx
import React from "react";
import Link from "next/link";
import styles from "./styles.module.scss";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link legacyBehavior href="/">
          <a className={styles.logo}>My Shopping List</a>
        </Link>
        <div className={styles.menu}>
          <Link legacyBehavior href="/Produto">
            <a className={styles.menuItem}>Produtos</a>
          </Link>
          <Link
            legacyBehavior
            href="/Usuario
          "
          >
            <a className={styles.menuItem}>Usuários</a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
