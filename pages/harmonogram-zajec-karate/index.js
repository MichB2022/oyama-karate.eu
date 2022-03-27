import axios from 'axios';
import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
import Collapsible from 'react-collapsible';
import { BsChevronDown } from 'react-icons/bs';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import ArticlesList from '../../src/components/shared/ArticlesList/ArticlesList';
import Button from '../../src/components/shared/Button/Button';
import { API_URL } from '../../src/configs/api';
import { getNavConfig } from '../../src/configs/nav';
import styles from './index.module.scss';

const TrainingsSchedule = ({ trainingsSchedule, pageDescription }) => {
  // const [trainingsSchedule, setTrainingsSchedule] = useState([]);

  const [numOfArticleItems, setNumOfArticleItems] = useState(6);

  useEffect(() => {
    setNumOfArticleItems(window.innerWidth > 1440 ? 6 : 4);
  }, []);

  //resize handling useEffect
  useEffect(() => {
    const handleResize = () => {
      setNumOfArticleItems(window.innerWidth > 1440 ? 6 : 4);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const generateCollapsibleElements = (trainingsSchedule) => {
    const schedule = [];
    for (const scheduleGroup of trainingsSchedule) {
      schedule.push(
        <Fragment key={`schedule-collapse-${scheduleGroup.id}`}>
          <Collapsible
            trigger={[<h3>{scheduleGroup.name}</h3>, <BsChevronDown />]}
            // open={group && scheduleGroup.name === group} //category
          >
            <div className={styles.tableWrapper}>
              <Table>
                <Thead>
                  <Tr>
                    <Th>
                      <p>Miejsce</p>
                    </Th>
                    <Th>
                      <p>Adres</p>
                    </Th>
                    <Th>
                      <p>Dzień i Godzina</p>
                    </Th>
                    <Th>
                      <p>Instruktor</p>
                    </Th>
                    <Th>
                      <p>Pomocnicy</p>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>{generateScheduleTableRows(scheduleGroup)}</Tbody>
              </Table>
            </div>
          </Collapsible>
        </Fragment>
      );
    }
    return schedule;
  };

  const generateScheduleTableRows = (scheduleGroup) => {
    const rows = [];
    for (const section of scheduleGroup.rows) {
      const { id, place, address, schedule, instructor, helpers } = section;

      rows.push(
        <Fragment key={`schedule-${id}-${place.replace(/ /g, '')}`}>
          <Tr>
            <Td>
              <p>{place}</p>
            </Td>
            <Td>
              <p>{address}</p>
            </Td>
            <Td>
              <div dangerouslySetInnerHTML={{ __html: schedule }} />
            </Td>
            <Td>
              <div dangerouslySetInnerHTML={{ __html: instructor }} />
            </Td>
            <Td>
              <div
                dangerouslySetInnerHTML={{
                  __html: helpers === '' ? '-' : helpers
                }}
              />
            </Td>
          </Tr>
        </Fragment>
      );
    }
    return rows;
  };

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>
          Oyama Karate Katowice - Ligota - Panewniki - Piotrowice - Podlesie,
          oraz Gliwice - Oyama-karate.eu - Harmonogram zajęć - oyama-karate.eu
        </title>
        <meta
          property='og:title'
          content={`Oyama Karate Katowice - Ligota - Panewniki - Piotrowice - Podlesie,
          oraz Gliwice - Oyama-karate.eu - Harmonogram zajęć - oyama-karate.eu`}
          key='ogtitle'
        />
        <meta key='robots' name='robots' content='index,follow' />
        <meta key='googlebot' name='googlebot' content='index,follow' />
        <meta name='description' content={pageDescription} />
        <meta
          property='og:description'
          content={pageDescription}
          key='ogdesc'
        />
      </Head>
      <section className={styles.trainingsSchedule}>
        <section className='container'>
          <header>
            <h1>Harmonogram Zajęć</h1>
          </header>
          <main>
            <div className='container'>
              <h2>Wybierz grupę wiekową, która Cię interesuje: </h2>
              <section className={styles.schedule}>
                {generateCollapsibleElements(trainingsSchedule)}
              </section>
            </div>
          </main>
        </section>

        <section className={styles.newsList}>
          <div className='container'>
            <h2 className={styles.newsH2}>Aktualności</h2>

            <ArticlesList
              className={styles.articlesList}
              numberOfItems={numOfArticleItems}
              additionalClass={styles.articlesContainer}
            />

            <div className={styles.buttonContainer}>
              <Button
                text='Więcej aktualności'
                onClick={
                  () => {}
                  // navigate('/wszystkie-aktualnosci', { replace: true })
                }
              />
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

// This also gets called at build time
export async function getStaticProps() {
  const data = await axios.get(`${API_URL}/schedule`);
  const navConfig = await getNavConfig();
  const pageDesc = await axios.get(`${API_URL}/homepage/description`);
  const pageDescription = pageDesc.data.data.defaultPageDescription;

  return {
    props: {
      trainingsSchedule: data.data.data.schedules || {},
      navConfig,
      pageDescription
    },
    revalidate: 3600
  };
}

export default TrainingsSchedule;
