import { useEffect, useState } from 'react';
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill
} from 'react-icons/bs';
import DayTile from './DayTile';
import styles from './YearCalendar.module.scss';
import axios from 'axios';
import { API_URL } from '../../../configs/api';

const YearCalendar = () => {
  const weekDaysNames = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz'];

  const [startYearDay, setStartYearDay] = useState(6);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState([]);
  const [loader, setLoader] = useState(true);

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

  useEffect(() => {
    // console.log(events);
  }, [events]);

  let startDay = 6;

  const isYearCommon = (y) => {
    if (y % 4 === 0 && y % 100 !== 0) {
      return true;
    }
    return false;
  };

  let nrOfFebDays = isYearCommon(currentYear) ? 29 : 28;

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

  const nrOfYearDays = (y) => {
    if (isYearCommon(y)) {
      return 366;
    } else {
      return 365;
    }
  };

  const generateDayTiles = (numberOfTiles, currentEvents, month) => {
    let dayTiles = [];
    for (let i = 0; i < numberOfTiles; i++) {
      let day = (
        <DayTile
          event={undefined}
          startDay={startDay}
          i={i}
          className={
            i + 1 === new Date().getDate() &&
            month === new Date().getMonth() &&
            currentYear === new Date().getFullYear()
              ? `${styles.dayTile} ${styles.currentDay}`
              : styles.dayTile
          }
        />
      );

      for (const event of events) {
        if (
          (event.month < event.monthEnd &&
            month + 1 < event.monthEnd &&
            month + 1 > event.month &&
            event.year === currentYear) ||
          (event.month < event.monthEnd &&
            month + 1 === event.month &&
            i + 1 >= event.dayStart &&
            event.year === currentYear) ||
          (event.month < event.monthEnd &&
            month + 1 === event.monthEnd &&
            i + 1 <= event.dayEnd &&
            event.year === currentYear) ||
          (event.month === event.monthEnd &&
            event.month === month + 1 &&
            event.year === currentYear &&
            (event.dayStart === event.dayEnd
              ? event.dayStart === i + 1
              : event.dayStart <= i + 1 && i + 1 <= event.dayEnd))
        ) {
          // console.log(month);
          day = (
            <DayTile
              event={event}
              startDay={startDay}
              i={i}
              className={`${styles.dayTile} ${styles.event} event-type-${event.category}`}
              // onClick={() => {
              //   setIsEventModalDisplayed(true);
              // }}
            />
          );
        }
      }
      dayTiles.push(day);
    }
    startDay += months[month].nrOfDays % 7;
    startDay %= 7;
    startDay = startDay === 0 ? 7 : startDay;
    return dayTiles;
  };

  const generateMonthTiles = (y) => {
    let monthTiles = [];
    let currentEvents = Array.apply(null, Array(12)).map(() => []);
    startDay = startYearDay;

    for (const event of events) {
      if (event.year === currentYear) {
        currentEvents[event.month - 1].push(event);
      }
    }

    for (let i = 0; i < 12; i++) {
      monthTiles.push(
        <div className={styles.monthContainer}>
          <div className={styles.monthName}>{months[i].name}</div>
          <div className={styles.weekDaysNames}>{generateWeekDays()}</div>
          <div className={styles.dayTilesContainer}>
            {generateDayTiles(months[i].nrOfDays, currentEvents, i)}
          </div>
        </div>
      );
    }
    return monthTiles;
  };

  const generateWeekDays = () => {
    let weekDays = [];
    for (let i = 0; i < weekDaysNames.length; i++) {
      weekDays.push(<div className={styles.weekDay}>{weekDaysNames[i]}</div>);
    }
    return weekDays;
  };

  useEffect(() => {}, [currentYear]);

  return (
    <main className={styles.yearCalendarContainer}>
      <div className={styles.yearArrowsContainer}>
        <div className={styles.arrowLeft}>
          <BsFillArrowLeftCircleFill
            onClick={() => {
              setCurrentYear(currentYear - 1);
              setStartYearDay(
                startYearDay - ((nrOfYearDays(currentYear - 1) % 7) % 7) <= 0
                  ? startYearDay - ((nrOfYearDays(currentYear - 1) % 7) % 7) + 7
                  : startYearDay - ((nrOfYearDays(currentYear - 1) % 7) % 7)
              );
            }}
          />
        </div>
        <div className={styles.year}>{currentYear}</div>
        <div className={styles.arrowRight}>
          <BsFillArrowRightCircleFill
            onClick={() => {
              setStartYearDay(
                (startYearDay + (nrOfYearDays(currentYear) % 7)) % 7 === 0
                  ? 7
                  : (startYearDay + (nrOfYearDays(currentYear) % 7)) % 7
              );
              setCurrentYear(currentYear + 1);
            }}
          />
        </div>
      </div>
      <div className={styles.monthsContainer}>
        {generateMonthTiles(currentYear)}
      </div>
    </main>
  );
};

export default YearCalendar;
