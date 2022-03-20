import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import styles from './Calendar.module.scss';

function CalendarView(props) {
  const {
    calendarTitle,
    chosenMonth,
    chosenYear,
    generateDayTiles,
    generateMonthListItems,
    generateWeekDays,
    generateYearsListItems,
    handleArrowClick,
    handleDateSwitcherClick,
    isMonthSwitcherOpen,
    isYearSwitcherOpen,
    months,
    startDay
  } = props;

  return (
    <section className={styles.calendarContainer}>
      <header className={styles.top}>
        <IoMdArrowDropleft
          className={styles.arrowLeft}
          onClick={() => handleArrowClick('LEFT')}
        />

        <p className={styles.monthAndYear} onClick={handleDateSwitcherClick}>
          {`${months[chosenMonth].name} ${chosenYear}`}
        </p>

        <IoMdArrowDropright
          className={styles.arrowRight}
          onClick={() => handleArrowClick('RIGHT')}
        />
      </header>

      <main className={styles.calendarContent}>
        {isYearSwitcherOpen && (
          <div className={styles.yearSwitcher}>
            <div className={styles.yearListWrapper}>
              <ul className={styles.yearList}>{generateYearsListItems()}</ul>
            </div>
          </div>
        )}

        {isMonthSwitcherOpen && (
          <div className={styles.monthSwitcher}>
            <div className={styles.monthListWrapper}>
              <ul className={styles.monthList}>{generateMonthListItems()}</ul>
            </div>
          </div>
        )}

        <div className={styles.weekDays}>{generateWeekDays()}</div>

        <div className={styles.monthDays}>
          {generateDayTiles(months[chosenMonth].nrOfDays, startDay)}
        </div>
      </main>
    </section>
  );
}

export default CalendarView;
