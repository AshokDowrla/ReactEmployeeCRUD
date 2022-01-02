import { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";
import { Close, Menu } from "@material-ui/icons";

const ModalOverlay = (props) => {
  const [burgerActive, setBurgerActive] = useState(false);
  const onBurgerClickHandler = () => {
    setBurgerActive((prevState) => !prevState);
  };

  return (
    <div className={styles["modal"]}>
      <div className={styles["sidebar--burger"]}>
        {!burgerActive && (
          <Menu
            className={styles["sidebar--burger__menu"]}
            onClick={onBurgerClickHandler}
          />
        )}
        {burgerActive && (
          <Close
            className={styles["sidebar--burger__close"]}
            onClick={onBurgerClickHandler}
          />
        )}
      </div>
      {burgerActive && props.children}
    </div>
  );
};

const portalElement = document.getElementById("overlays");
const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
