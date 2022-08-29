import { useEffect, useState } from 'react';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { ParallaxBanner, ParallaxProvider } from 'react-scroll-parallax';
import { sanityClient } from '../../../../sanity';
import karateImg from '../../../assets/karate.jpeg';
import dojo from '../../../assets/treningi-sala.webp';
import ArticleBody from '../../ArticleBody/ArticleBody';
import ContactForm from '../ContactForm/ContactForm';
import { v4 as uuidv4 } from 'uuid';
import styles from './SectionInfo.module.scss';

const SectionInfo = ({ section }) => {
  const [contact, setcontact] = useState({
    phone: '600 - 383 - 727',
    email: 'michalbodziony@oyama-karate.eu'
  });
  useEffect(async () => {
    const contactData = await sanityClient.fetch(
      `
      *[_type == "contactData"][0] {
        phone,
        email
      }
    `
    );
    setcontact(contactData);
  }, []);

  const weekDays = [
    'Poniedziałki',
    'Wtorki',
    'Środy',
    'Czwartki',
    'Piątki',
    'Soboty',
    'Niedziele'
  ];

  let usedDays = [];

  // for (const day of weekDays) {
  //   for (const group of section.groups) {
  //     for (const schedule of group.schedule) {
  //       if (schedule.day === day) {
  //         usedDays.push(day);
  //       }
  //     }
  //   }
  // }

  // usedDays = [...new Set(usedDays)];

  // const generateDayNames = () => {
  //   let days = [];
  //   usedDays.map((day) => {
  //     days.push(<th key={day}>{day}</th>);
  //   });
  //   return days;
  // };

  // const generateCurrentGroupUsedDays = (group) => {
  //   let result = [];
  //   group?.schedule.map((el) => result.push(el.day));
  //   return result;
  // };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.groupDescription}>
          <ArticleBody body={section.description} />
        </div>
      </div>

      <div className={styles.container}>
        <section className={styles.scheduleWrapper}>
          <ParallaxProvider>
            <ParallaxBanner
              className={styles.scheduleParallax}
              layers={[
                {
                  image: dojo.src,
                  amount: 0.5
                }
              ]}
              style={{
                height: '100%',
                padding: ''
              }}
            >
              <div className={styles.container}>
                <div className={styles.scheduleInfoWrapper}>
                  <h2 className={styles.scheduleTitle}>ZAJĘCIA</h2>
                  <p className={styles.location}>{section.address}</p>
                  <table className={styles.schedule}>
                    <thead>
                      <tr className={styles.daysRow}>
                        <th></th>
                        {section.days.map((day) => (
                          <th key={uuidv4()}>{day}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.scheduleRows.map((row) => (
                        <tr key={uuidv4()}>
                          <td className={styles.group}>{row.groupName}</td>
                          {row.hours.split(';').map((hour) => (
                            <td className={styles.hours} key={uuidv4()}>
                              {hour}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </ParallaxBanner>
          </ParallaxProvider>
        </section>
      </div>

      <div className={styles.googleMapsLocalisation}>
        <div className={styles.container}>
          <iframe
            title={section.name}
            src={section.googleMapsLink}
            width='100%'
            height='100%'
            allowFullScreen=''
            loading='lazy'
          ></iframe>
        </div>
      </div>

      <section className={styles.contact}>
        <ParallaxProvider>
          <ParallaxBanner
            className={styles.contactParallax}
            layers={[
              {
                image: karateImg.src,
                amount: 0.5
              }
            ]}
            style={{
              height: '100%',
              padding: ''
            }}
          >
            <div className={styles.contactContainer}>
              <h1 className={styles.contactTitle}>ZAPISY TRWAJĄ</h1>
              <h2 className={styles.phoneNr}>
                <BsFillTelephoneFill />
                <div>{contact.phone}</div>
              </h2>
              <ContactForm />
            </div>
          </ParallaxBanner>
        </ParallaxProvider>
      </section>
    </>
  );
};

export default SectionInfo;
