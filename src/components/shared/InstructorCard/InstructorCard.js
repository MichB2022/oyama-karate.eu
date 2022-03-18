// import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import instructorPhoto from '../../../assets/instruktor.jpeg';
import styles from './InstructorCard.module.scss';

function InstructorCard({ animation, instructor }) {
  const { id, name, description, degree } = instructor;
  return (
    <div className={styles.card}>
      <img
        src={instructorPhoto.src}
        alt='Instructor image'
        className={styles.instructorImage}
      />
      <div className={styles.vignette}>
        <div className={styles.instructorInfo}>
          <h3>
            Sensei {name}, {degree}
          </h3>
          <p>{description}</p>
        </div>
        {/* <Link className={styles.instructorLink} to={`/instruktorzy/${id}`}> */}
        <div className={styles.btnContainer}>
          <Button text={'Czytaj dalej'} />
        </div>
        {/* </Link> */}
      </div>
    </div>
  );
}

export default InstructorCard;
