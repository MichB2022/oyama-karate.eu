import styles from './Modal.module.scss';
import { ImCross } from 'react-icons/im';
import { API_UPLOADS_URL, API_URL } from '../../../configs/api';

const Modal = ({ event, setIsEventModalDisplayed, isEventModalDisplayed }) => {
  const { imgUrl, title, dayStart, dayEnd, month, year, address, description } =
    event;

  const setDate = (date) => {
    return date > 9 ? date : '0' + date;
  };

  const eventDate = new Date(`${event.year}/${event.month}/${event.dayEnd}`);
  const currentDate = new Date();

  const ifEventWas =
    eventDate < currentDate ? '(wydarzenie się już odbyło)' : '';

  return (
    <div className={styles.modalBg}>
      <div
        className={styles.eventInfoContainer}
        style={{
          backgroundImage: `url(${API_UPLOADS_URL}/calendar/${imgUrl})`
        }}
      >
        <div className={styles.vignette}>
          <div className={styles.crossContainer}>
            <ImCross
              className={styles.cross}
              onClick={() => setIsEventModalDisplayed(!isEventModalDisplayed)}
            />
          </div>
          {/* <img src={temporaryImg} alt='current event image' /> */}
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.address}>{`${address}`}</p>
          <p className={styles.date}>{`${
            dayStart === dayEnd
              ? setDate(dayStart)
              : `${setDate(dayStart)} - ${setDate(dayEnd)}`
          }.${setDate(month)}.${year} ${ifEventWas}`}</p>
          <h2 className={styles.descriptionTitle}>Opis wydarzenia: </h2>
          <div
            className={`${styles.description} ql-editor`}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
