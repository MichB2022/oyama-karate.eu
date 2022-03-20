import { BsFillTelephoneFill } from 'react-icons/bs';
import { ParallaxBanner, ParallaxProvider } from 'react-scroll-parallax';
import karateImg from '../../../assets/karate.jpeg';
import dojo from '../../../assets/treningi-sala.webp';
import ContactForm from '../ContactForm/ContactForm';
import styles from './SectionInfo.module.scss';

const SectionInfo = ({ section }) => {
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

  for (const day of weekDays) {
    for (const group of section.groups) {
      for (const schedule of group.schedule) {
        if (schedule.day === day) {
          usedDays.push(day);
        }
      }
    }
  }

  usedDays = [...new Set(usedDays)];

  const generateDayNames = () => {
    let days = [];
    usedDays.map((day) => {
      days.push(<th key={day}>{day}</th>);
    });
    return days;
  };

  const generateCurrentGroupUsedDays = (group) => {
    let result = [];
    group?.schedule.map((el) => result.push(el.day));
    return result;
  };

  return (
    <>
      <div className={styles.container}>
        <div
          className={`${styles.groupDescription} ql-editor`}
          dangerouslySetInnerHTML={{ __html: section.description }}
        ></div>
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
                        {generateDayNames()}
                      </tr>
                    </thead>
                    <tbody>
                      {section.groups.map((group) => (
                        <tr key={group.groupName} className={styles.groupRow}>
                          <td className={styles.group}>{group.groupName}</td>
                          {console.log(
                            generateCurrentGroupUsedDays(group).includes(day)
                          )}
                          {usedDays.map((day) =>
                            generateCurrentGroupUsedDays(group).includes(
                              day
                            ) ? (
                              <td
                                key={`${
                                  group.schedule.find((el) => el.day === day).id
                                }`}
                                className={styles.hours}
                              >
                                {
                                  group.schedule.find((el) => el.day === day)
                                    .hours
                                }
                              </td>
                            ) : (
                              <td className={styles.hours}>-</td>
                            )
                          )}
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
                <div>600 - 383 - 727</div>
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
