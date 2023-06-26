import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

import Container from '@/components/Container';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <Container className={styles.headerContainer}>
        <p className={styles.headerTitle}>
          <Link href="/">
            Pokémon Generator
          </Link>
        </p>
        <ul className={styles.headerLinks}>
          <li>
          <Link href="/pokemons">
            Your Pokemon
            </Link>
          </li>
          <li>
            <a href="https://github.com/anaskhan28" rel="noreferrer">
              <FaGithub />
            </a>
          </li>
        </ul>
      </Container>
    </header>
  );
};

export default Header;
