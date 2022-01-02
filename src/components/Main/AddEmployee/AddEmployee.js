import React, { Fragment } from "react";
import { KeyboardBackspace } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./AddEmployee.module.scss";
import EmployeeForm from "./EmployeeForm/EmployeeForm";
import LoadingState from "./LoadingState/LoadingState";
// import axios from "axios";

const AddEmployee = (props) => {
  const { state } = useLocation();
  const isLoading = useSelector((state) => state.newEmployee.isLoading);
  return (
    <Fragment>
      {isLoading && <LoadingState styles={styles} />}

      <div className={styles["addPerson--container"]}>
        <Link to="addEmployee">
          <div className={styles["addPerson--header"]}>
            <KeyboardBackspace className={styles["addPerson--header__back"]} />

            <span className={styles["addPerson--header__text"]}>
              {props.title}
            </span>
          </div>
        </Link>

        <EmployeeForm state={state} />
      </div>
    </Fragment>
  );
};

export default React.memo(AddEmployee);
