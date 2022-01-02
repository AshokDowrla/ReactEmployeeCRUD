import { useState, useEffect, useRef } from "react";
import styles from "./SelectDropdown.module.scss";

const SelectDropdown = ({ currentValue, options, id, isError }) => {
  const node = useRef();
  const [modalOpen, setModalOpen] = useState(false);


  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setModalOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div
      className={`${styles["select--wrapper"]} ${isError ? "invalid" : ""}`}
      onClick={() => {
        setModalOpen((prevState) => !prevState);
      }}
      id={id}
      ref={node}
    >
      <div className={styles["select--main"]}>{currentValue}</div>

      {modalOpen && <ul> {options.map((eachOption) => eachOption)}</ul>}
    </div>
  );
};

export default SelectDropdown;
