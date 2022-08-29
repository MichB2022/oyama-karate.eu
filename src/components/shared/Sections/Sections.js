import urlBuilder from '@sanity/image-url';
import { useContext, useEffect, useState } from 'react';
import { sanityClient } from '../../../../sanity';
import SectionsContext from '../../../context/sections/SectionsContext';
import Loader from '../Loader/Loader';
import SectionInfo from '../SectionInfo/SectionInfo';
import styles from './Sections.module.scss';

const Sections = ({ firtsSectionToDisplay }) => {
  const { sectionToDisplay } = useContext(SectionsContext);
  const [section, setSection] = useState(firtsSectionToDisplay);
  const [loader, setLoader] = useState(false);

  console.log(firtsSectionToDisplay);

  useEffect(async () => {
    setLoader(true);
    if (sectionToDisplay._id) {
      const id = sectionToDisplay._id;
      const sectionData = await sanityClient.fetch(
        `
        *[_type == "sections" && _id == $id][0] {
          _id,
          name,
          label,
          mainImage,
          mainImageAlt,
          description,
          address,
          googleMapsLink,
          days,
          scheduleRows
        }
      `,
        { id }
      );
      setSection(sectionData);
      setLoader(false);
    }
  }, [sectionToDisplay._id]);

  if (loader) {
    return <Loader />;
  }

  return (
    <>
      <section className={`${styles.sectionsContainer}`}>
        <div className={styles.container}>
          <h1 className={styles.place}>{section.name}</h1>
          <img
            src={urlBuilder(sanityClient).image(section.mainImage).url()}
            alt={section.mainImgAlt}
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
