import React, { useCallback, useState } from "react";

const date = new Date();
const currentDate = date.getDate();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth();
const daysCount = new Date(currentYear, currentMonth + 1, 0).getDate();
const DOBContext = React.createContext({
  currentDateValue: currentDate,
  currentMonthValue: currentMonth,
  currentYearValue: currentYear,
  onMonthClickHandler: (i) => {},
  onDateClickHandler: (date) => {},
  onYearClickHandler: (year) => {}
});

export const DOBContextProvider = (props) => {
  

  const [currentDayOptions, setCurrentDayOptions] = useState(daysCount);
  const [currentDateValue, setCurrentDateValue] = useState(currentDate);
  const [currentYearValue, setCurrentYearValue] = useState(currentYear);
  const [currentMonthValue, setCurrentMonthValue] = useState(currentMonth);

  // console.log(
  //   currentDayOptions,
  //   currentDateValue,
  //   currentYearValue,
  //   currentMonthValue
  // );

  const onMonthClickHandler = (i) => {
    const daysCount = new Date(currentYearValue, i + 1, 0).getDate();
    setCurrentDayOptions(daysCount);
    setCurrentMonthValue(i);
  };

  const onDateClickHandler = (Date) => {
    setCurrentDateValue(Date);
  };

  const onYearClickHandler = (year) => {
    const daysCount = new Date(year, currentMonthValue + 1, 0).getDate();

    setCurrentYearValue(year);

    setCurrentDayOptions(daysCount);
  };

  const resetHandler = useCallback(() => {
    setCurrentDayOptions(daysCount);
    setCurrentDateValue(currentDate);
    setCurrentYearValue(currentYear);
    setCurrentMonthValue(currentMonth);
  },[]);

  return (
    <DOBContext.Provider
      value={{
        currentDayOptions: currentDayOptions,
        currentDateValue: currentDateValue,
        currentMonthValue: currentMonthValue,
        currentYearValue: currentYearValue,
        onMonthClickHandler: onMonthClickHandler,
        onDateClickHandler: onDateClickHandler,
        onYearClickHandler: onYearClickHandler,
        resetHandler: resetHandler
      }}
    >
      {props.children}
    </DOBContext.Provider>
  );
};

export default DOBContext;
