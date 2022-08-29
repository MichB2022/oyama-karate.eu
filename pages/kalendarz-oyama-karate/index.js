import { useEffect, useState } from 'react';
import Calendar from '../../src/components/shared/Calendar/Calendar';
import { CalendarProvider } from '../../src/components/shared/Calendar/CalendarContext';
import ColorsDescription from '../../src/components/shared/Calendar/ColorsDescription';
import EventInfo from '../../src/components/shared/Calendar/EventInfo';
import YearCalendar from '../../src/components/shared/YearCalendar/YearCalendar';
import styles from './index.module.scss';
import axios from 'axios';
import { API_URL } from '../../src/configs/api';
import Head from 'next/head';
import { getNavConfig } from '../../src/configs/nav';

function CalendarPage({ pageData }) {
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
    <>
      {/* <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>oyama-karate.eu</title>
        <meta key='robots' name='robots' content='index,follow' />
        <meta key='googlebot' name='googlebot' content='index,follow' />
        <meta property='og:title' content={'oyama-karate.eu'} key='ogtitle' />
        <meta name='description' content={pageData.pageDescription} />
        <meta
          property='og:description'
          content={pageData.pageDescription}
          key='ogdesc'
        />
      </Head> */}

      {/* <CalendarProvider>
        <article className={'container'}>
          <h1 className={styles.calendarTitle}>{pageData.title}</h1>
          <div className={styles.calendarDescription}>
            <div
              className='ql-editor'
              dangerouslySetInnerHTML={{
                __html: pageData.description
              }}
            />
            <br />
            <p className={styles.eventClickInstruction}>
              Kliknij w kalendarzu na wydarzenie, aby dowiedzieć się o nim
              więcej!
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

          <ColorsDescription width={windowWidth} />

          <div className={styles.calendarInfo}>
            <ul className={styles.calendarInfoList}>
              <li className={styles.calendarInfoListItem}>
                <div
                  className='ql-editor'
                  dangerouslySetInnerHTML={{
                    __html: pageData.secondDescription
                  }}
                />
              </li>
            </ul>
          </div>
        </article>
      </CalendarProvider> */}
    </>
  );
}

// This also gets called at build time
export async function getStaticProps() {
  const navConfig = await getNavConfig();
  // const data = await axios.get(`${API_URL}/calendarpage`);

  // let pageDescription = data.data.data.pageDescription;

  // if (
  //   !data.data.data.pageDescription ||
  //   data.data.data.pageDescription === ''
  // ) {
  //   const pageDesc = await axios.get(`${API_URL}/homepage/description`);
  //   pageDescription = pageDesc.data.data.defaultPageDescription;
  // }

  return {
    props: { navConfig },
    revalidate: 3600
  };
}

export default CalendarPage;
