import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import SelectDropdown from "../SelectDropdown/SelectDropdown";
import styles from "../SelectDropdown/SelectDropdown.module.scss";
import useInput from "../../../../hooks/useInput";
import { newEmployeeActions } from "../../../../store/newEmployeeReducer";
// import {newEm} from "./"

const DropdownState = ({
  options,
  label,
  id,
  validateText,
  resetting,
  selectDropdownsHandler,
  formSubmitted,
  type,
  prefillData
}) => {
  const [currentValue, setCurrentValue] = useState(label);
  const {
    value: selectValue,
    isValid: selectIsValid,
    hasErrorMsg: selectHasError,
    valueChangeHandler: selectChangeHandler,
    setIsTouched: selectBlurHandler,
    reset: resetSelect
  } = useInput(validateText);

  let isError = selectHasError.length > 0 ? true : false;

  const dispatch = useDispatch();

  useEffect(() => {
    if (resetting) {
      resetSelect();
    }
  }, [resetting, resetSelect]);

  useEffect(() => {
    if (formSubmitted) {
      selectBlurHandler(true);
    }
  }, [formSubmitted, selectBlurHandler]);

  useEffect(() => {
    if (!selectValue.length) {
      setCurrentValue(label);
    }

    selectDropdownsHandler(id, selectIsValid);
  }, [selectValue, label, selectDropdownsHandler, selectIsValid, id]);

  const onDropdownSelect = useCallback(
    (value) => {
      setCurrentValue(value);

      selectChangeHandler(value);
      dispatch(newEmployeeActions.addProperty({ type, value }));
    },
    [dispatch, selectChangeHandler, type]
  );

  useEffect(() => {
    if (prefillData.length) {
      onDropdownSelect(prefillData);
    }
  }, [prefillData, onDropdownSelect]);
  let dropdownOptions = [];

  for (let i = 0; i < options.length; i++) {
    dropdownOptions.push(
      <li
        key={options[i]}
        value={options[i]}
        className={`${styles["addPerson--date__year"]}  ${
          options[i] === currentValue ? "active" : ""
        }`}
        onClick={onDropdownSelect.bind(null, options[i])}
      >
        {options[i]}
      </li>
    );
  }
  return (
    <div className={styles["select--error__wrapper"]} data-id={id}>
      <SelectDropdown
        options={dropdownOptions}
        currentValue={currentValue}
        id={id}
        isError={isError}
      />
      {isError && <span>{selectHasError}</span>}
    </div>
  );
};

export default React.memo(DropdownState);
