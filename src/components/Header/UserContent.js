import styles from "./Header.module.scss";
import { ArrowDropDown, NotificationsNone } from "@material-ui/icons";
import { Avatar } from "@material-ui/core";
import User from "../../assets/user.png";
import { Fragment } from "react";
const UserContent = () => {
  return (
    <Fragment>
      <div className={styles["header--notifications"]}>
        <NotificationsNone className={styles["header--notifications__bell"]} />
        <span>10</span>
      </div>
      <div className={styles["header--user"]}>
        <Avatar
          alt="User Image"
          src={User}
          className={styles["header--user__img"]}
        />
        <div className={styles["header--user__name"]}>John Doe</div>
        <ArrowDropDown className={styles["header--user__more"]} />
      </div>
    </Fragment>
  );
};

export default UserContent;
