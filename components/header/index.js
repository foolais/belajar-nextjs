import Menu from "../menu";
import { withAuth } from "../with-auth";

import styles from "./styles.module.css";

function Header() {
  return (
    <div className={styles.header}>
      <Menu />
    </div>
  );
}

export default withAuth(Header);
