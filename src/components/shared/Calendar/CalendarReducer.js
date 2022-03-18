const CalendarReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EVENT':
      return {
        ...state,
        event: action.payload
      };
    case 'SET_MONTH':
      return {
        ...state,
        chosenMonth: action.payload
      };
    case 'SET_YEAR':
      return {
        ...state,
        chosenYear: action.payload
      };
    case 'SET_LOUDER':
      return {
        ...state,
        louderForOthers: action.payload
      };
    case 'SET_START_DAY':
      return {
        ...state,
        startDay: action.payload
      };
    case 'SET_IS_YEAR_SWITCHER_OPEN':
      return {
        ...state,
        isYearSwitcherOpen: action.payload
      };
    case 'SET_IS_MONTH_SWITCHER_OPEN':
      return {
        ...state,
        isMonthSwitcherOpen: action.payload
      };
    case 'SET_PREV_CHOSEN_YEAR':
      return {
        ...state,
        prevChosenYear: action.payload
      };
    case 'SET_PREV_CHOSEN_MONTH':
      return {
        ...state,
        prevChosenMonth: action.payload
      };
    case 'SET_CALENDAR_TITLE':
      return {
        ...state,
        calendarTitle: action.payload
      };
    case 'SET_DAYS_TO_MOVE':
      return {
        ...state,
        daysToMove: action.payload
      };
    case 'SET_IS_MONTH_CHOSEN':
      return {
        ...state,
        isMonthChosen: action.payload
      };
    case 'SET_CURRENT_EVENTS':
      return {
        ...state,
        currentEvents: action.payload
      };
    default:
      return state;
  }
};

export default CalendarReducer;
