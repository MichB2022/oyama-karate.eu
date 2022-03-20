// import { Link } from 'react-router-dom';
import Link from 'next/link';
import instructorPhoto from '../../../assets/instruktor.jpeg';
import Button from '../Button/Button';
import styles from './InstructorCard.module.scss';

function InstructorCard({ animation, instructor }) {
  const { id, name, description, degree, title } = instructor;
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
            {title} {name}, {degree}
          </h3>
          <p>{description}</p>
        </div>
        <Link href={`/instruktorzy/${id}`}>
          <a className={styles.instructorLink}>
            <div className={styles.btnContainer}>
              <Button text={'Czytaj dalej'} />
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default InstructorCard;
