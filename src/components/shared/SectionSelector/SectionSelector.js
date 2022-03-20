import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { API_URL } from '../../../configs/api';
import SectionsContext from '../../../context/sections/SectionsContext';
import Loader from '../Loader/Loader';
import styles from './SectionSelector.module.scss';

const SectionSelector = () => {
  const { sectionToDisplay, dispatch } = useContext(SectionsContext);
  const [places, setPlaces] = useState([]);
  const [louder, setlouder] = useState(true);

  useEffect(async () => {
    const data = await axios.get(`${API_URL}/sections/labels`);
    setPlaces(data.data.data);
    dispatch({ type: 'SET_SECTION_TO_DISPLAY', payload: data.data.data[0] });
    setlouder(false);
  }, []);

  const generateSelectorItems = (sectionToDisplay, dispatch) => {
    let selectorItems = [];

    for (let i = 0; i < places.length; i++) {
      selectorItems.push(
        <div
          key={places[i].id}
          className={`${styles.sectionSelectorButton} ${
            sectionToDisplay.id === places[i].id && styles.active
          }`}
          onClick={() =>
            dispatch({ type: 'SET_SECTION_TO_DISPLAY', payload: places[i] })
          }
        >
          {places[i].label}
        </div>
      );
    }

    return selectorItems;
  };

  return (
    <>
      {louder && <Loader />}
      {!louder && (
        <div className={styles.sectionSelectorButtonContainer}>
          {
            <div className={styles.container}>
              {generateSelectorItems(sectionToDisplay, dispatch)}
            </div>
          }
        </div>
      )}
    </>
  );
};

export default SectionSelector;
