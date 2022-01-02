import { createSlice } from "@reduxjs/toolkit";

const initialJsonState = { employeeJson: [], changed: false, idValid: true };

const employeeJsonSlice = createSlice({
  name: "employeeJson",
  initialState: initialJsonState,
  reducers: {
    replaceEmployees(state, action) {
      state.changed = false;
      state.employeeJson = action.payload;
    },
    addNewEmployee(state, action) {
      const existingItem = state.employeeJson.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItem === -1) {
        state.changed = false;
        state.employeeJson = state.employeeJson.concat(action.payload);
      } else {
        state.changed = true;
        state.employeeJson[existingItem] = action.payload;
      }
    },
    deleteEmployee(state, action) {
      state.changed = true;
      const id = action.payload;
      state.employeeJson = state.employeeJson.filter((item) => item.id !== id);
    },
    resetChanged(state, action) {
      state.changed = false;
    },
    checkIdValidity(state, action) {
      const existingItem = state.employeeJson.findIndex(
        (item) => item.id === action.payload
      );

      if (existingItem === -1) {
        state.idValid = true;
      } else {
        state.idValid = false;
      }
    }
  }
});

export const employeeJsonActions = employeeJsonSlice.actions;

export default employeeJsonSlice.reducer;
