import ContactForm from '../ContactForm/ContactForm';
import styles from './SectionInfo.module.scss';
import { ParallaxBanner, ParallaxProvider } from 'react-scroll-parallax';
import karateImg from '../../../assets/karate.jpeg';
import dojo from '../../../assets/treningi-sala.webp';
import { BsFillTelephoneFill } from 'react-icons/bs';

const SectionInfo = ({ section }) => {
  const generateDayNames = () => {
    let days = [];
    let usedDays = [];
    section.groups.map((gr) => {
      gr.schedule.map((el) => {
        if (!usedDays.find((element) => element === el.day)) {
          usedDays.push(el.day);
          days.push(<th key={el.day}>{el.day}</th>);
        }
      });
    });

    return days;
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
                          {group.schedule.map((sched) => (
                            <td
                              key={`${sched.hours}-${sched.day}`}
                              className={styles.hours}
                            >
                              {sched.hours}
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
