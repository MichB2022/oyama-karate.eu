import { useContext, useEffect, useState } from 'react';
import styles from './Calendar.module.scss';
import CalendarContext from './CalendarContext';
import CalendarView from './CalendarView';
import DayTile from './DayTile.js';
import { countDays } from './helpers.js';
import axios from 'axios';
import { API_URL } from '../../../configs/api';

function Calendar() {
  let nrOfFebDays = 28;
  let nrOfAllDays = 0;

  const [events, setEvents] = useState([]);
  const [loader, setLoader] = useState(true);

  const weekDaysNames = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz'];

  const {
    dispatch,
    chosenMonth,
    chosenYear,
    louderForOthers,
    startDay,
    isYearSwitcherOpen,
    isMonthSwitcherOpen,
    prevChosenYear,
    prevChosenMonth,
    calendarTitle,
    daysToMove,
    isMonthChosen
  } = useContext(CalendarContext);

  useEffect(async () => {
    let data = await axios.get(`${API_URL}/calendar`);
    setEvents(
      data.data.data.map((el) => {
        return {
          ...el,
          year: parseInt(el.startDate.slice(0, 4)),
          month: parseInt(el.startDate.slice(5, 7)),
          monthEnd: parseInt(el.endDate.slice(5, 7)),
          dayStart: parseInt(el.startDate.slice(8, 10)),
          dayEnd: parseInt(el.endDate.slice(8, 10))
        };
      })
    );
    setLoader(false);
  }, []);

  const months = [
    { name: 'STYCZEŃ', nrOfDays: 31 },
    { name: 'LUTY', nrOfDays: nrOfFebDays },
    { name: 'MARZEC', nrOfDays: 31 },
    { name: 'KWIECIEŃ', nrOfDays: 30 },
    { name: 'MAJ', nrOfDays: 31 },
    { name: 'CZERWIEC', nrOfDays: 30 },
    { name: 'LIPIEC', nrOfDays: 31 },
    { name: 'SIERPIEŃ', nrOfDays: 31 },
    { name: 'WRZESIEŃ', nrOfDays: 30 },
    { name: 'PADZIERNIK', nrOfDays: 31 },
    { name: 'LISTOPAD', nrOfDays: 30 },
    { name: 'GRUDZIEŃ', nrOfDays: 31 }
  ];

  for (let i = 0; i < 12; i++) {
    nrOfAllDays += months[i].nrOfDays;
  }

  useEffect(() => {
    dispatch({
      type: 'SET_CALENDAR_TITLE',
      payload: `${months[chosenMonth].name} ${chosenYear}`
    });
    dispatch({ type: 'SET_YEAR_SWITCHER', payload: false });
    nrOfFebDays = chosenYear % 4 === 0 && chosenYear % 100 !== 0 ? 29 : 28;
  }, [chosenYear]);

  useEffect(() => {
    if (louderForOthers === true) {
      dispatch({
        type: 'SET_DAYS_TO_MOVE',
        payload: countDays(
          prevChosenMonth,
          prevChosenYear,
          chosenMonth,
          chosenYear,
          months,
          nrOfAllDays
        )
      });
      dispatch({ type: 'SET_LOUDER', payload: false });
    }
  }, [louderForOthers]);

  useEffect(() => {
    const daysToMoveMod7 = (startDay + (daysToMove % 7)) % 7;
    const newStartDayFuture = daysToMoveMod7 <= 0 ? 7 : daysToMoveMod7;
    const newStartDayPast =
      daysToMoveMod7 <= 0 ? daysToMoveMod7 + 7 : daysToMoveMod7;
    dispatch({
      type: 'SET_START_DAY',
      payload: daysToMove > 0 ? newStartDayFuture : newStartDayPast
    });
  }, [daysToMove]);

  const handleDateSwitcherClick = () => {
    if (isMonthChosen) {
      dispatch({
        type: 'SET_DAYS_TO_MOVE',
        payload: countDays(
          0,
          chosenYear,
          prevChosenMonth,
          prevChosenYear,
          months,
          nrOfAllDays
        )
      });
      dispatch({
        type: 'SET_IS_MONTH_SWITCHER_OPEN',
        payload: !isMonthSwitcherOpen
      });
      dispatch({
        type: 'SET_IS_MONTH_CHOSEN',
        payload: false
      });
    } else if (isMonthSwitcherOpen) {
      dispatch({
        type: 'SET_IS_MONTH_SWITCHER_OPEN',
        payload: !isMonthSwitcherOpen
      });
    } else {
      dispatch({
        type: 'SET_IS_YEAR_SWITCHER_OPEN',
        payload: !isYearSwitcherOpen
      });
    }
  };

  const handleArrowClick = (side) => {
    if (side === 'LEFT' && !isYearSwitcherOpen && !isMonthSwitcherOpen) {
      let prevStart;
      if (chosenMonth > 0) {
        prevStart = startDay - ((months[chosenMonth - 1].nrOfDays % 7) % 7);
        dispatch({ type: 'SET_PREV_CHOSEN_MONTH', payload: chosenMonth });
        dispatch({ type: 'SET_MONTH', payload: chosenMonth - 1 });
      } else if (!isYearSwitcherOpen) {
        dispatch({ type: 'SET_PREV_CHOSEN_YEAR', payload: chosenYear });
        dispatch({ type: 'SET_YEAR', payload: chosenYear - 1 });
        prevStart =
          startDay -
          ((months[chosenMonth - 1 < 0 ? 11 : chosenMonth - 1].nrOfDays % 7) %
            7);
        dispatch({ type: 'SET_MONTH', payload: 11 });
      }
      dispatch({
        type: 'SET_START_DAY',
        payload: prevStart <= 0 ? prevStart + 7 : prevStart
      });
    } else if (
      side === 'RIGHT' &&
      !isYearSwitcherOpen &&
      !isMonthSwitcherOpen
    ) {
      dispatch({ type: 'SET_PREV_CHOSEN_MONTH', payload: chosenMonth });

      dispatch({
        type: 'SET_START_DAY',
        payload: ((startDay + months[chosenMonth].nrOfDays - 1) % 7) + 1
      });

      if (chosenMonth < 11 && !isYearSwitcherOpen && !isMonthSwitcherOpen) {
        dispatch({ type: 'SET_MONTH', payload: chosenMonth + 1 });
      } else if (!isYearSwitcherOpen) {
        dispatch({ type: 'SET_YEAR', payload: chosenYear + 1 });
        dispatch({ type: 'SET_MONTH', payload: 0 });
      }
    }
  };

  const generateWeekDays = () => {
    let weekDays = [];
    for (let i = 0; i < weekDaysNames.length; i++) {
      weekDays.push(<div className={styles.weekDay}>{weekDaysNames[i]}</div>);
    }
    return weekDays;
  };

  const generateDayTiles = (numberOfTiles, startDay) => {
    let dayTiles = [];
    for (let i = 0; i < numberOfTiles; i++) {
      dayTiles.push(
        <DayTile
          dataDay={i + 1}
          style={{ gridColumnStart: `${((startDay + i - 1) % 7) + 1}` }}
          className={
            i + 1 === new Date().getDate() &&
            chosenMonth === new Date().getMonth() &&
            chosenYear === new Date().getFullYear()
              ? `${styles.dayTile} ${styles.currentDay}`
              : styles.dayTile
          }
          chosenMonth={chosenMonth}
          chosenYear={chosenYear}
          events={events}
        />
      );
    }
    return dayTiles;
  };

  const generateYearsListItems = () => {
    let yearsListItems = [];
    for (let i = 2012; i < 2050; i++) {
      yearsListItems.push(
        <li
          className={styles.yearItem}
          onClick={(event) => {
            dispatch({ type: 'SET_IS_MONTH_CHOSEN', payload: true });
            dispatch({ type: 'SET_PREV_CHOSEN_YEAR', payload: chosenYear });
            dispatch({
              type: 'SET_YEAR',
              payload: Number.parseInt(event.target.innerText)
            });
            dispatch({
              type: 'SET_IS_MONTH_SWITCHER_OPEN',
              payload: !isMonthSwitcherOpen
            });
            dispatch({ type: 'SET_IS_YEAR_SWITCHER_OPEN', payload: false });
          }}
        >
          {i}
        </li>
      );
    }
    return yearsListItems;
  };

  const handleMonthChooseClick = (e) => {
    dispatch({ type: 'SET_IS_MONTH_CHOSEN', payload: false });
    dispatch({
      type: 'SET_IS_MONTH_SWITCHER_OPEN',
      payload: !isMonthSwitcherOpen
    });
    dispatch({ type: 'SET_IS_YEAR_SWITCHER_OPEN', payload: false });
    dispatch({ type: 'SET_PREV_CHOSEN_MONTH', payload: chosenMonth });

    const currentMonth = months.findIndex(
      (el) => el.name === e.target.innerText
    );
    dispatch({ type: 'SET_MONTH', payload: currentMonth });

    dispatch({ type: 'SET_LOUDER', payload: true });
  };

  const generateMonthListItems = () => {
    let monthListItems = [];
    for (let i = 0; i <= 11; i++) {
      monthListItems.push(
        <li className={styles.monthItem} onClick={handleMonthChooseClick}>
          {months[i].name}
        </li>
      );
    }
    return monthListItems;
  };

  return (
    <CalendarView
      calendarTitle={calendarTitle}
      chosenMonth={chosenMonth}
      generateMonthListItems={generateMonthListItems}
      generateWeekDays={generateWeekDays}
      generateYearsListItems={generateYearsListItems}
      handleArrowClick={handleArrowClick}
      isMonthSwitcherOpen={isMonthSwitcherOpen}
      isYearSwitcherOpen={isYearSwitcherOpen}
      months={months}
      startDay={startDay}
      generateDayTiles={generateDayTiles}
      handleDateSwitcherClick={handleDateSwitcherClick}
      chosenYear={chosenYear}
    />
  );
}

export default Calendar;
