import { configureStore } from "@reduxjs/toolkit";
import employeeJsonReducer from "./employeeJsonReducer";
import newEmployeeReducer from "./newEmployeeReducer";

const store = configureStore({
  reducer: { addJson: employeeJsonReducer, newEmployee: newEmployeeReducer }
});

export default store;
