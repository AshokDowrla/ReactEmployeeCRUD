import { createSlice } from "@reduxjs/toolkit";

const initialNewEmployee = {
  newEmployee: { overallScore: "0%", individualScore: "0%" },
  formReady: false,
  reset: false,
  isLoading: false
};

const newEmployeeSlice = createSlice({
  name: "newEmployee",
  initialState: initialNewEmployee,
  reducers: {
    addProperty(state, action) {
      const { type, value } = action.payload;
      state.newEmployee[type] = value;
    },

    resetProperty(state, action) {
      state.newEmployee = {};
    },
    formSubmitted(state, action) {
      state.formReady = action.payload;
    },
    resetForm(state, action) {
      state.reset = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    }
  }
});

export const newEmployeeActions = newEmployeeSlice.actions;

export default newEmployeeSlice.reducer;
