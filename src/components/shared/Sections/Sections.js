import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { API_UPLOADS_URL, API_URL } from '../../../configs/api';
import SectionsContext from '../../../context/sections/SectionsContext';
import Loader from '../Loader/Loader';
import SectionInfo from '../SectionInfo/SectionInfo';
import styles from './Sections.module.scss';

const Sections = ({ firtsSectionToDisplay }) => {
  const { sectionToDisplay } = useContext(SectionsContext);
  const [section, setSection] = useState(firtsSectionToDisplay);
  const [loader, setLoader] = useState(false);

  useEffect(async () => {
    setLoader(true);
    if (sectionToDisplay.id) {
      const data = await axios.get(
        `${API_URL}/sections/${sectionToDisplay.id}`
      );
      setSection(data.data.data);
      setLoader(false);
    }
  }, [sectionToDisplay.id]);

  if (loader) {
    return <Loader />;
  }

  return (
    <>
      <section className={`${styles.sectionsContainer}`}>
        <div className={styles.container}>
          <h1 className={styles.place}>{sectionToDisplay.name}</h1>
          <img
            src={`${API_UPLOADS_URL}/sections/${section.bigImgUrl}`}
            alt={section.bigImgAlt}
            className={styles.groupPhoto}
          />
        </div>

        <article className={styles.sectionsInfoContainer}>
          <SectionInfo section={section}></SectionInfo>
        </article>
      </section>
    </>
  );
};

export default Sections;
