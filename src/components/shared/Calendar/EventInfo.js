import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill
} from 'react-icons/bs';
import { API_URL } from '../../../configs/api';
import CalendarContext from './CalendarContext';
import styles from './EventInfo.module.scss';

const EventInfo = () => {
  const { event, dispatch, chosenMonth, chosenYear, currentEvents } =
    useContext(CalendarContext);
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

  const {
    imgSrc,
    title,
    dayStart,
    dayEnd,
    month,
    year,
    address,
    description,
    city
  } = event;

  const setDate = (date) => {
    return date > 9 ? date : '0' + date;
  };

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  if (!isEmpty(event)) {
    const eventDate = new Date(`${event.year}/${event.month}/${event.dayEnd}`);
    const currentDate = new Date();

    const ifEventWas =
      eventDate < currentDate ? '(wydarzenie się już odbyło)' : '';

    return (
      <div className={styles.edges}>
        <div
          className={styles.eventContainer}
          style={{ backgroundImage: `url(${imgSrc})` }}
        >
          <div className={styles.vignette}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.address}>{`${address}, ${city}`}</p>
            <p className={styles.date}>
              {`${
                dayStart === dayEnd
                  ? setDate(dayStart)
                  : `${setDate(dayStart)} - ${setDate(dayEnd)}`
              }.${setDate(month)}.${year} ${ifEventWas}`}
            </p>
            <p className={styles.description}>{description}</p>
            <div className={styles.arrowsContainer}>
              <BsFillArrowLeftSquareFill
                className={styles.arrow}
                onClick={() => {
                  const eventIndex = events.indexOf(event);
                  if (
                    eventIndex > 0 &&
                    (chosenMonth !== events[eventIndex - 1].month ||
                      chosenYear !== events[eventIndex - 1].year)
                  ) {
                    dispatch({
                      type: 'SET_EVENT',
                      payload: events[eventIndex - 1]
                    });
                    dispatch({
                      type: 'SET_PREV_CHOSEN_YEAR',
                      payload: chosenYear
                    });
                    dispatch({
                      type: 'SET_YEAR',
                      payload: events[eventIndex - 1].year
                    });
                    dispatch({
                      type: 'SET_PREV_CHOSEN_MONTH',
                      payload: chosenMonth
                    });
                    dispatch({
                      type: 'SET_MONTH',
                      payload: events[eventIndex - 1].month - 1
                    });
                    dispatch({ type: 'SET_LOUDER', payload: true });
                  }
                }}
              />
              <BsFillArrowRightSquareFill
                className={styles.arrow}
                onClick={() => {
                  const eventIndex = events.indexOf(event);
                  if (
                    eventIndex + 1 < events.length &&
                    (chosenMonth !== events[eventIndex + 1].month ||
                      chosenYear !== events[eventIndex + 1].year)
                  ) {
                    dispatch({
                      type: 'SET_EVENT',
                      payload: events[eventIndex + 1]
                    });
                    dispatch({
                      type: 'SET_PREV_CHOSEN_YEAR',
                      payload: chosenYear
                    });
                    dispatch({
                      type: 'SET_YEAR',
                      payload: events[eventIndex + 1].year
                    });
                    dispatch({
                      type: 'SET_PREV_CHOSEN_MONTH',
                      payload: chosenMonth
                    });
                    dispatch({
                      type: 'SET_MONTH',
                      payload: events[eventIndex + 1].month - 1
                    });
                    dispatch({ type: 'SET_LOUDER', payload: true });
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default EventInfo;
