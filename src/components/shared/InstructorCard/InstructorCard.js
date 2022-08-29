// import { Link } from 'react-router-dom';
import urlBuilder from '@sanity/image-url';
import Link from 'next/link';
import { sanityClient } from '../../../../sanity';
import Button from '../Button/Button';
import styles from './InstructorCard.module.scss';

function InstructorCard({ animation, instructor }) {
  const { _id, name, shortenDesc, degree, title, mainImage } = instructor;
  return (
    <div className={styles.card}>
      <img
        src={urlBuilder(sanityClient).image(mainImage).url()}
        alt='Instructor image'
        className={styles.instructorImage}
      />
      <div className={styles.vignette}>
        <div className={styles.instructorInfo}>
          <h3>
            {title} {name}, {degree}
          </h3>
          <p>{shortenDesc}</p>
        </div>
        <Link href={`/instruktorzy/${_id}`}>
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
