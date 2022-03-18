import { createContext, useReducer } from 'react';
import CalendarReducer from './CalendarReducer';

const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  const initialState = {
    event: {},
    currentEvents: [],
    chosenMonth: new Date().getMonth(),
    chosenYear: new Date().getFullYear(),
    louderForOthers: false,
    startDay: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    ).getDay(),
    isYearSwitcherOpen: false,
    isMonthSwitcherOpen: false,
    prevChosenYear: 2022,
    prevChosenMonth: 0,
    calendarTitle: `STYCZEŃ 2022`,
    daysToMove: 0,
    isMonthChosen: false
  };

  const [state, dispatch] = useReducer(CalendarReducer, initialState);

  return (
    <CalendarContext.Provider
      value={{
        event: state.event,
        currentEvents: state.currentEvents,
        chosenYear: state.chosenYear,
        chosenMonth: state.chosenMonth,
        louderForOthers: state.louderForOthers,
        startDay: state.startDay,
        isYearSwitcherOpen: state.isYearSwitcherOpen,
        isMonthSwitcherOpen: state.isMonthSwitcherOpen,
        prevChosenYear: state.prevChosenYear,
        prevChosenMonth: state.prevChosenMonth,
        calendarTitle: state.calendarTitle,
        daysToMove: state.daysToMove,
        isMonthChosen: state.isMonthChosen,
        dispatch
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarContext;
