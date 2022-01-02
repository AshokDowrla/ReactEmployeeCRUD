import { useState, useCallback } from "react";
import validateValue from "./validateValue";
const useInput = (inputField) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  // console.log(enteredValue);

  const valueErrorMsg = validateValue(inputField, enteredValue);
  const valueIsValid = !valueErrorMsg.length;
  const hasErrorMsg = !valueIsValid && isTouched ? valueErrorMsg : "";

  const valueChangeHandler = useCallback((value) => {
    setEnteredValue(value);
    setIsTouched(true);
  }, []);

  const reset = useCallback(() => {
    setEnteredValue("");
    setIsTouched(false);
  }, []);
  return {
    value: enteredValue,
    isValid: valueIsValid,
    setIsTouched,
    hasErrorMsg,
    valueChangeHandler,
    reset
  };
};

export default useInput;
