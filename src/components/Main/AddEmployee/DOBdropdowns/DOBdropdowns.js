import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SelectDropdown from "../SelectDropdown/SelectDropdown";
import styles from "../SelectDropdown/SelectDropdown.module.scss";
import DOBContext from "../../../../store/dob-context";
import { newEmployeeActions } from "../../../../store/newEmployeeReducer";

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

const DOBdropdowns = (props) => {
  const dobContext = useContext(DOBContext);
  const currentDateValue = dobContext.currentDateValue;
  const currentMonthValue = month[dobContext.currentMonthValue];
  const currentYearValue = dobContext.currentYearValue;
  const [initialState, setInitialState] = useState(true);


  const dispatch = useDispatch();
  const { prefillDOB } = props;
  useEffect(() => {
    if (initialState && prefillDOB.length) {
      return;
    }
    const DOB =
      currentDateValue + "/" + currentMonthValue + "/" + currentYearValue;
    dispatch(
      newEmployeeActions.addProperty({
        type: "dateOfBirth",
        value: DOB
      })
    );
  }, [
    currentDateValue,
    currentMonthValue,
    currentYearValue,
    dispatch,
    prefillDOB,
    initialState
  ]);

  const { resetHandler } = dobContext;
  const { resetting } = props;
  useEffect(() => {
    if (resetting) {
      resetHandler();
    }
  }, [resetting, resetHandler]);

  useEffect(() => {
    if (prefillDOB.length && initialState) {
       setInitialState(false)
      const DOBarray = prefillDOB.split("/");
      const monthIndex = month.indexOf(DOBarray[1]);
      dobContext.onDateClickHandler(DOBarray[0]);
      dobContext.onMonthClickHandler(monthIndex);
      dobContext.onYearClickHandler(DOBarray[2]);
    }
  }, [prefillDOB, dobContext,initialState]);

  const date = new Date();

  const currentYear = date.getFullYear();

  let monthOptions = [];

  for (let i = 0; i < 12; i++) {
    monthOptions.push(
      <li
        key={month[i]}
        value={month[i]}
        className={`${styles["addPerson--date__month"]} ${
          month[dobContext.currentMonthValue] === month[i] ? "active" : ""
        }`}
        onClick={dobContext.onMonthClickHandler.bind(null, i)}
      >
        {month[i]}
      </li>
    );
  }

  let dayOptions = [];

  for (let i = 1; i <= dobContext.currentDayOptions; i++) {
    dayOptions.push(
      <li
        key={i}
        value={i}
        className={`${styles["addPerson--date__day"]} ${
          dobContext.currentDateValue === i ? "active" : ""
        }`}
        onClick={dobContext.onDateClickHandler.bind(null, i)}
      >
        {i}
      </li>
    );
  }

  let yearOptions = [];

  // yearOptions.push(
  //   <li
  //     key={currentYear}
  //     value={currentYear}
  //     className={`${styles["addPerson--date__year"]}  ${
  //       dobContext.currentYearValue === currentYear ? "active" : ""
  //     }`}
  //     onClick={dobContext.onYearClickHandler.bind(null, currentYear)}
  //   >
  //     {currentYear}
  //   </li>
  // );

  for (let i = 10; i <= 30; i++) {
    yearOptions = [
      <li
        key={currentYear - i}
        value={currentYear - i}
        className={`${styles["addPerson--date__year"]} ${
          dobContext.currentYearValue === currentYear - i ? "active" : ""
        }`}
        onClick={dobContext.onYearClickHandler.bind(null, currentYear - i)}
      >
        {currentYear - i}
      </li>,
      ...yearOptions
    ];
  }

  return (
    <div className={styles["addPerson--date__dropdowns"]}>
      <SelectDropdown
        options={dayOptions}
        currentValue={dobContext.currentDateValue}
        id="day"
      />

      <SelectDropdown
        options={monthOptions}
        currentValue={month[dobContext.currentMonthValue]}
        id="month"
      />

      <SelectDropdown
        options={yearOptions}
        currentValue={dobContext.currentYearValue}
        id="year"
      />
    </div>
  );
};

export default React.memo(DOBdropdowns);
