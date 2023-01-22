import styles from "./toolbar.module.css";
import Link from "next/link";

export default function Toolbar() {
  return (
    <div className={`${styles.navbar}`}>
      <Link href={`/players/roster`} className={styles.navbarItem}>
        Roster
      </Link>
      <Link href={`/`} className={styles.navbarItem}>
        Home
      </Link>
    </div>
  );
}
