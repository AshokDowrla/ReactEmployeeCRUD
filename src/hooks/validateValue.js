export default function validateValue(inputField, enteredValue) {
    const capitalisedName =
      inputField.charAt(0).toUpperCase() + inputField.slice(1);
    if (!enteredValue.trim().length) {
      return capitalisedName + " can not be empty";
    }
    else{
      return ""
    }

}