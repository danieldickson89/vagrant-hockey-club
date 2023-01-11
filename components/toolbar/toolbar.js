import styles from "./toolbar.module.css";
import Link from "next/link";

export default function Toolbar() {
  return (
    <div className={`${styles.navbar}`}>
      <Link href={`/`} className={styles.navbarItem}>
        Roster
      </Link>
      <Link href={`/`} className={styles.navbarItem}>
        Team Picker
      </Link>
    </div>
  );
}
