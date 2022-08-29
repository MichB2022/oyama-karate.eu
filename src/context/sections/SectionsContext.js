import { createContext, useEffect, useReducer, useState } from 'react';
import { sanityClient } from '../../../sanity';
import SectionsReducer from './SectionsReducer';

const SectionsContext = createContext();

export const SectionsProvider = ({ children }) => {
  const [firstSection, setFirstSection] = useState({});

  useEffect(async () => {
    const section = await sanityClient.fetch(`
      *[_type == "sections"][0] {
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
    `);

    setFirstSection(section);
  }, []);

  const initialState = {};

  const [state, dispatch] = useReducer(SectionsReducer, initialState);
  return (
    <SectionsContext.Provider
      value={{
        sectionToDisplay: state,
        dispatch
      }}
    >
      {children}
    </SectionsContext.Provider>
  );
};

export default SectionsContext;
