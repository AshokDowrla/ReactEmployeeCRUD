import styles from "./Header.module.scss";
import Logo from "../../assets/Logo.png";
import UserContent from "./UserContent";

const Header = () => {
  const portModal = window.innerWidth <= 700;
  return (
    <header className={styles["header--container"]}>
      <img src={Logo} alt="App Logo" className={styles["header--logo"]} />
      {!portModal && <UserContent />}
    </header>
  );
};

export default Header;
