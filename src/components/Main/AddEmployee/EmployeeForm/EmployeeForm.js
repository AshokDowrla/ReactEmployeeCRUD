import React, {
  useRef,
  useMemo,
  useState,
  useCallback,
  useEffect
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

import styles from "./EmployeeForm.module.scss";
import commonStyles from "../AddEmployee.module.scss";

import DOBdropdowns from "../DOBdropdowns/DOBdropdowns";
import DropdownState from "../DropdownState/DropdownState";
import UploadImg from "../UploadImg/UploadImg";
import RadioButtonGroup from "../RadioButtonGroup/RadioButtonGroup";
import { newEmployeeActions } from "../../../../store/newEmployeeReducer";
import { uploadImageToServer } from "../../../../store/employee-actions";
import { employeeJsonActions } from "../../../../store/employeeJsonReducer";

const roleDropdowns = ["Developer", "Tester", "Team Lead"];
const referDropdowns = ["Person A", "Person B", "Person C"];
const maritalDropdowns = ["Single", "Married"];

const EmployeeForm = (props) => {
  const [firstNameIsNotValid, setFirstNameIsNotValid] = useState(false);
  const [clientIdIsNotValid, setClientIdIsNotValid] = useState(false);
  const [referIsValid, setReferIsValid] = useState(false);
  const [eduIsValid, setEduIsValid] = useState(false);
  const [roleIsValid, setRoleIsValid] = useState(false);
  const [maritalIsValid, setMaritalIsValid] = useState(false);

  const [image, setImage] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const formReady = useSelector((state) => state.newEmployee.formReady);
  const globalReset = useSelector((state) => state.newEmployee.reset);
  const newEmployeeJson = useSelector((state) => state.newEmployee.newEmployee);
  const uniqueId = useSelector((state) => state.addJson.idValid);

  const { state } = props;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // console.log("EmForm");

  const selectDropdownsHandler = useCallback((id, valid) => {
    if (id === "referred") {
      setReferIsValid(valid);
    }

    if (id === "education") {
      setEduIsValid(valid);
    }

    if (id === "role") {
      setRoleIsValid(valid);
    }

    if (id === "marital_status") {
      setMaritalIsValid(valid);
    }
  }, []);

  const firstNameRef = useRef();
  const clientIdRef = useRef();
  const contactRef = useRef();
  const experienceRef = useRef();
  const skillsRef = useRef();
  const languageRef = useRef();
  const healthRef = useRef();

  let formIsValid = false;

  if (
    referIsValid &&
    eduIsValid &&
    roleIsValid &&
    maritalIsValid &&
    !firstNameIsNotValid &&
    !clientIdIsNotValid &&
    image
  ) {
    formIsValid = true;
  }

  // console.log(
  //   referIsValid,
  //   eduIsValid,
  //   roleIsValid,
  //   maritalIsValid,
  //   !firstNameIsNotValid,
  //   !clientIdIsNotValid,
  //   image
  // );

  const onTextInputChange = (type, e) => {
    const value = e.target.value.trim();
    let setFunction;
    switch (type) {
      case "name":
        setFunction = setFirstNameIsNotValid;
        break;

      case "id":
        setFunction = setClientIdIsNotValid;
        if (!state) {
          dispatch(employeeJsonActions.checkIdValidity(value));
        }
        break;

      default:
        return;
    }
    if (!value.length) {
      setFunction(true);
    } else {
      setFunction(false);
    }
  };

  useEffect(() => {
    if (!uniqueId) {
      setClientIdIsNotValid(true);
    }
  }, [uniqueId]);

  useEffect(() => {
    if (!!state) {
      firstNameRef.current.value = state.name;
      clientIdRef.current.value = state.id;
      contactRef.current.value = state.contactDetials;
      experienceRef.current.value = state.experience;
      skillsRef.current.value = state.skills;
      languageRef.current.value = state.language;
      healthRef.current.value = state.health;
      dispatch(
        newEmployeeActions.addProperty({
          type: "overallScore",
          value: state.overallScore
        })
      );
      dispatch(
        newEmployeeActions.addProperty({
          type: "individualScore",
          value: state.individualScore
        })
      );
    }
  }, [state, dispatch]);

  const onUploadHandler = useCallback((imageUrl) => {
    setImage(imageUrl);
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const firstName = firstNameRef.current.value.trim();
    const clientId = clientIdRef.current.value.trim();
    const contact = contactRef.current.value.trim();
    const experience = experienceRef.current.value.trim();
    const skills = skillsRef.current.value.trim();
    const language = languageRef.current.value.trim();
    const health = healthRef.current.value.trim();

    if (!firstName.length) {
      setFirstNameIsNotValid(true);
    } else {
      setFirstNameIsNotValid(false);
    }

    if (!clientId.length) {
      setClientIdIsNotValid(true);
    } else {
      if (uniqueId) {
        setClientIdIsNotValid(false);
      }
    }

    if (!formIsValid) {
      return;
    }

    dispatch(newEmployeeActions.setLoading(true));

    dispatch(
      newEmployeeActions.addProperty({
        type: "name",
        value: firstName
      })
    );

    dispatch(
      newEmployeeActions.addProperty({
        type: "id",
        value: clientId
      })
    );

    dispatch(
      newEmployeeActions.addProperty({
        type: "contactDetials",
        value: contact
      })
    );

    dispatch(
      newEmployeeActions.addProperty({
        type: "skills",
        value: skills
      })
    );

    dispatch(
      newEmployeeActions.addProperty({
        type: "language",
        value: language
      })
    );

    dispatch(
      newEmployeeActions.addProperty({
        type: "experience",
        value: experience
      })
    );

    dispatch(
      newEmployeeActions.addProperty({
        type: "health",
        value: health
      })
    );

    if (typeof image === "string") {
      dispatch(
        newEmployeeActions.addProperty({ type: "image", value: state.image })
      );
      dispatch(newEmployeeActions.formSubmitted(true));
    } else {
      dispatch(uploadImageToServer(image));
    }
  };

  const onResetHandler = useCallback(() => {
    // e.preventDefault()
    dispatch(newEmployeeActions.resetForm(true));
    setFormSubmitted(false);
    setFirstNameIsNotValid(false);
    setClientIdIsNotValid(false);
    setImage(null);
    firstNameRef.current.value = "";
    if (!state) {
      clientIdRef.current.value = "";
    }
    contactRef.current.value = "";
    experienceRef.current.value = "";
    skillsRef.current.value = "";
    languageRef.current.value = "";
    healthRef.current.value = "";
    dispatch(employeeJsonActions.checkIdValidity(""));
    dispatch(newEmployeeActions.resetProperty());

    dispatch(
      newEmployeeActions.addProperty({
        type: "overallScore",
        value: "0%"
      })
    );
    dispatch(
      newEmployeeActions.addProperty({
        type: "individualScore",
        value: "0%"
      })
    );
  }, [dispatch, state]);

  useEffect(() => {
    // console.log("reset effect");
    if (formReady && !globalReset) {
      dispatch(employeeJsonActions.addNewEmployee(newEmployeeJson));
      onResetHandler();
    }
  }, [formReady, onResetHandler, dispatch, newEmployeeJson, globalReset]);

  useEffect(() => {
    // console.log("Formreset effect");
    if (globalReset) {
      dispatch(newEmployeeActions.resetForm(false));
      if (formReady) {
        dispatch(newEmployeeActions.formSubmitted(false));
        dispatch(newEmployeeActions.setLoading(false))
        navigate("/");
      }
    }
  }, [formReady, globalReset, dispatch, navigate]);
  return (
    <form className={commonStyles["addPerson--info"]}>
      <h4 className={`basicTitle ${commonStyles["addPerson--info__title"]}`}>
        Basic Info
      </h4>
      <UploadImg
        onUpload={onUploadHandler}
        reset={globalReset}
        prefillImage={!!state ? state.image : ""}
        formSubmitted={formSubmitted}
      />
      <TextField
        className={commonStyles["addPerson--info__input"]}
        id="fullName"
        label="Full Name"
        variant="outlined"
        data-id="fullName"
        inputRef={firstNameRef}
        error={firstNameIsNotValid}
        helperText={firstNameIsNotValid ? "Name can not be empty" : ""}
        onChange={onTextInputChange.bind(null, "name")}
      />
      <TextField
        className={commonStyles["addPerson--info__input"]}
        id="clientId"
        label="Enter  ID"
        variant="outlined"
        data-id="clientId"
        inputRef={clientIdRef}
        error={clientIdIsNotValid}
        helperText={
          clientIdIsNotValid && !uniqueId
            ? "Id already exists"
            : clientIdIsNotValid && uniqueId
            ? "Id can not be empty"
            : ""
        }
        onChange={onTextInputChange.bind(null, "id")}
        inputProps={
          !!state
            ? {
                readOnly: true
              }
            : {}
        }
      />

      <RadioButtonGroup
        defaultValue="Male"
        prefillGender={!!state ? state.gender : ""}
        reset={globalReset}
      />

      <div className={styles["addPerson--date"]} id="employeeDOB">
        <label htmlFor="DOB" className={styles["addPerson--date__label"]}>
          Date of Birth
        </label>

        <DOBdropdowns
          resetting={globalReset}
          prefillDOB={!!state ? state.dateOfBirth : ""}
        />
      </div>

      <DropdownState
        options={referDropdowns}
        label="Referred by"
        id="referred"
        type="referredBy"
        validateText="refer"
        resetting={globalReset}
        selectDropdownsHandler={selectDropdownsHandler}
        formSubmitted={formSubmitted}
        prefillData={!!state ? state.referredBy : ""}
      />

      <DropdownState
        options={useMemo(() => ["Bachelor's", "Master's"], [])}
        label="Select Education"
        id="education"
        type="education"
        validateText="education"
        resetting={globalReset}
        selectDropdownsHandler={selectDropdownsHandler}
        formSubmitted={formSubmitted}
        prefillData={!!state ? state.education : ""}
      />

      <DropdownState
        options={roleDropdowns}
        label="Select Role"
        id="role"
        type="role"
        validateText="role"
        resetting={globalReset}
        selectDropdownsHandler={selectDropdownsHandler}
        formSubmitted={formSubmitted}
        prefillData={!!state ? state.role : ""}
      />

      <DropdownState
        options={maritalDropdowns}
        label="Select Marital Status"
        id="marital_status"
        type="maritalStatus"
        validateText="marital status"
        resetting={globalReset}
        selectDropdownsHandler={selectDropdownsHandler}
        formSubmitted={formSubmitted}
        prefillData={!!state ? state.maritalStatus : ""}
      />

      <div className={styles["standardTextFields--wrapper"]}>
        <div className={styles["standardTextFields"]}>
          <label
            htmlFor="contactDetails"
            className={styles["addPerson--date__label"]}
          >
            Contact Details
          </label>
          <TextField
            id="contactDetails"
            className={styles["standardTextFields--input"]}
            label=""
            variant="standard"
            inputRef={contactRef}
          />
        </div>
        <div className={styles["standardTextFields"]}>
          <label
            htmlFor="experienceDetails"
            className={styles["addPerson--date__label"]}
          >
            Experience
          </label>
          <TextField
            id="experienceDetails"
            className={styles["standardTextFields--input"]}
            label=""
            variant="standard"
            inputRef={experienceRef}
          />
        </div>
        <div className={styles["standardTextFields"]}>
          <label
            htmlFor="skillsDetails"
            className={styles["addPerson--date__label"]}
          >
            Skills
          </label>
          <TextField
            id="skillsDetails"
            className={styles["standardTextFields--input"]}
            label=""
            variant="standard"
            inputRef={skillsRef}
          />
        </div>

        <div className={styles["standardTextFields"]}>
          <label
            htmlFor="languageDetails"
            className={styles["addPerson--date__label"]}
          >
            Language
          </label>
          <TextField
            id="languageDetails"
            className={styles["standardTextFields--input"]}
            label=""
            variant="standard"
            inputRef={languageRef}
          />
        </div>
        <div className={styles["standardTextFields"]}>
          <label
            htmlFor="healthDetails"
            className={styles["addPerson--date__label"]}
          >
            Health
          </label>
          <TextField
            id="healthDetails"
            className={styles["standardTextFields--input"]}
            label=""
            variant="standard"
            inputRef={healthRef}
          />
        </div>
      </div>

      <div className={styles["addPerson--form__btns"]}>
        <button
          type="submit"
          className={styles["addPerson--form__submit"]}
          onClick={onSubmitHandler}
        >
          Submit
        </button>
        <button
          className={styles["addPerson--form__reset"]}
          onClick={onResetHandler}
          type="button"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default React.memo(EmployeeForm);
