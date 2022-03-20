import { useEffect, useState } from 'react';
import Calendar from '../../src/components/shared/Calendar/Calendar';
import { CalendarProvider } from '../../src/components/shared/Calendar/CalendarContext';
import ColorsDescription from '../../src/components/shared/Calendar/ColorsDescription';
import EventInfo from '../../src/components/shared/Calendar/EventInfo';
import YearCalendar from '../../src/components/shared/YearCalendar/YearCalendar';
import styles from './index.module.scss';

function CalendarPage() {
  const [isCalendarDisplayed, setIsCalendarDisplayed] = useState(false);
  const [isYearCalendarDisplayed, setIsYearCalendarDisplayed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1440);

  const setCalendarToDisplay = (width) => {
    if (width >= 1024) {
      setIsYearCalendarDisplayed(true);
      setIsCalendarDisplayed(false);
    } else {
      setIsYearCalendarDisplayed(false);
      setIsCalendarDisplayed(true);
    }
  };

  useEffect(() => {
    setCalendarToDisplay(window.innerWidth);
    setWindowWidth(window.innerWidth);

    const hadleResize = () => {
      setCalendarToDisplay(window.innerWidth);
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', hadleResize);

    return () => window.removeEventListener('resize', hadleResize);
  }, []);

  return (
    <CalendarProvider>
      <article className={'container'}>
        <h1 className={styles.calendarTitle}>Kalendarz 2021</h1>
        <div className={styles.calendarDescription}>
          KALENDARZ IMPREZ KLUBOWYCH ORAZ OYAMA PFK W II POŁOWIE 2021 ROKU{' '}
          <br /> (stan na 26.08.2021.) <br /> <br />
          <span>
            Zawody Klubowe organizowane przez ŚKK "GOLIAT" zostaną uzupełnione w
            najbliższym czasie.
          </span>
          <p className={styles.eventClickInstruction}>
            Kliknij w kalendarzu na wydarzenie, aby dowiedzieć się o nim więcej!
          </p>
        </div>

        {isCalendarDisplayed && (
          <>
            <section className={styles.calendar}>
              <Calendar />
            </section>
            <section className={styles.eventInfo}>
              <EventInfo />
            </section>
          </>
        )}

        {isYearCalendarDisplayed && <YearCalendar />}

        {/* <p className='event-switcher-instuction'>
          Uzywaj strzałek, aby przeglądać kolejne wydarzenia!
        </p> */}

        <ColorsDescription width={windowWidth} />

        <div className={styles.calendarInfo}>
          <ul className={styles.calendarInfoList}>
            <li className={styles.calendarInfoListItem}>
              Organizatorzy ww. imprez zastrzegają sobie prawo do dokonania
              zmian organizacyjno-programowych, będących następstwem
              ewentualnych zarządzeń władz centralnych lub lokalnych,
              wynikających np. z epidemii COVID-19.
            </li>
            <li className={styles.calendarInfoListItem}>
              Kalendarz nie zawiera zawodów organizowanych przez federacje
              karate współpracujące z OYAMA PFK,
            </li>
          </ul>
        </div>
      </article>
    </CalendarProvider>
  );
}

export default CalendarPage;
