import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup
} from "@material-ui/core";
import commonStyles from "../AddEmployee.module.scss";
import { newEmployeeActions } from "../../../../store/newEmployeeReducer";
const RadioButtonGroup = ({ defaultValue, reset, prefillGender }) => {
  const [genderValue, setGenderValue] = useState(defaultValue);

  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    setGenderValue(e.target.value);

    dispatch(
      newEmployeeActions.addProperty({ type: "gender", value: e.target.value })
    );
  };

  useEffect(() => {
    if (reset) {
      setGenderValue(defaultValue);
    }
  }, [reset, defaultValue]);

  useEffect(() => {
    if (prefillGender.length) {
      setGenderValue(prefillGender);

      dispatch(
        newEmployeeActions.addProperty({ type: "gender", value: prefillGender })
      );
    }
  }, [prefillGender, dispatch]);

  return (
    <FormControl
      component="fieldset"
      className={commonStyles["addPerson--gender"]}
      id="gender"
    >
      <span
        component="legend"
        className={commonStyles["addPerson--gender__label"]}
      >
        Gender
      </span>
      <RadioGroup
        row
        aria-label="gender"
        name="row-radio-buttons-group"
        defaultValue="Male"
        className={commonStyles["addPerson--gender__group"]}
        onChange={onChangeHandler}
        value={genderValue}
      >
        <FormControlLabel value="Male" control={<Radio />} label="Male" />
        <FormControlLabel value="Female" control={<Radio />} label="Female" />

        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonGroup;
