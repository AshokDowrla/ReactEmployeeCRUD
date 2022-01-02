import { Fragment, useState } from "react";
import styles from "./SidebarItem.module.scss";
const SidebarItem = (props) => {
  const [activeOption, setActiveOption] = useState("0");

  const onOptionClickHandler = (id) => {
    setActiveOption(id);
  };


  return (
    <Fragment>
      <li
        className={`${styles["sidebarItem"]} ${
          props.id === props.activeStateId ? "active" : ""
        } sidebarItem-option`}
        id={props.id}
        onClick={props.click.bind(null, props.id)}
      >
        {props.icon}
        <h4>{props.title}</h4>
      </li>
      {props.options && props.id === props.activeStateId && (
        <ul className={styles["sidebarItem__subOptions"]}>
          {props.options.map((option, index) => (
            <li
              key={option.id}
              id={option.id}
              className={`${styles["sidebarItem__subOption"]} ${
                activeOption === option.id ? "active" : ""
              } sidebarItem-subOption`}
              onClick={onOptionClickHandler.bind(null, option.id)}
            >
              {option.title}
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default SidebarItem;
