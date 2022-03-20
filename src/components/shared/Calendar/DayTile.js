import { useContext } from 'react';
import styles from './Calendar.module.scss';
import CalendarContext from './CalendarContext';

const DayTile = ({
  dataDay,
  style,
  chosenMonth,
  chosenYear,
  events,
  className
}) => {
  let currentEvent;
  const { dispatch } = useContext(CalendarContext);
  for (const event of events) {
    if (event.year === chosenYear) {
      if (
        (event.month < event.monthEnd &&
          chosenMonth + 1 < event.monthEnd &&
          chosenMonth + 1 > event.month &&
          event.year === chosenYear) ||
        (event.month < event.monthEnd &&
          chosenMonth + 1 === event.month &&
          dataDay + 1 >= event.dayStart &&
          event.year === chosenYear) ||
        (event.month < event.monthEnd &&
          chosenMonth + 1 === event.monthEnd &&
          dataDay + 1 <= event.dayEnd &&
          event.year === chosenYear) ||
        (event.month === event.monthEnd &&
          event.month === chosenMonth + 1 &&
          event.year === chosenYear &&
          (event.dayStart === event.dayEnd
            ? event.dayStart === dataDay + 1
            : event.dayStart <= dataDay + 1 && dataDay + 1 <= event.dayEnd))
      ) {
        currentEvent = event;
      }
    }
  }

  let cls = `${styles.dayTile} ${
    currentEvent
      ? `${styles.eventType} event-type-${currentEvent.categoryName}`
      : className
  }`;

  let currentDate = new Date();
  const eventDate = currentEvent
    ? new Date(
        `${currentEvent.year} / ${currentEvent.month} / ${currentEvent.dayEnd}`
      )
    : null;
  if (currentEvent) {
    cls += currentDate > eventDate ? ` ${styles.pastEvent}` : '';
  }

  return (
    <div
      data-day={dataDay}
      className={cls}
      style={style}
      onClick={() => {
        if (currentEvent) {
          dispatch({ type: 'SET_EVENT', payload: currentEvent });
        }
      }}
    >
      {`${dataDay}`}
    </div>
  );
};

export default DayTile;
