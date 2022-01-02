import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { DOBContextProvider } from "../../store/dob-context";
import { updateData, fetchData } from "../../store/employee-actions";
import { employeeJsonActions } from "../../store/employeeJsonReducer";

import AddEmployee from "./AddEmployee/AddEmployee";

import EmployeeList from "./EmployeeList/EmployeeList";
import styles from "./Main.module.scss";

let isInitial = true;
const Main = () => {
  // console.log("MainOutsie");
  const dispatch = useDispatch();

  const employeeData = useSelector((state) => state.addJson.employeeJson);
  const changed = useSelector((state) => state.addJson.changed);



  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (changed) {
      dispatch(updateData(employeeData));
      dispatch(employeeJsonActions.resetChanged())
    }
  }, [dispatch, employeeData, changed]);

  return (
    <div className={styles["main--container"]}>
      <Routes>
        <Route
          path="/"
          element={<EmployeeList employeeData={employeeData} />}
        />
        <Route path="/*" element={<Navigate to="/" />} />
        <Route
          path="/addEmployee"
          element={
            <DOBContextProvider>
              <AddEmployee title="Add a Person" />
            </DOBContextProvider>
          }
        />
        <Route
          path="/updateEmployee"
          element={
            <DOBContextProvider>
              <AddEmployee title="Update a Person" />
            </DOBContextProvider>
          }
        />
      </Routes>
    </div>
  );
};

export default Main;
