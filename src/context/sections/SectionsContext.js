import { createContext, useEffect, useReducer, useState } from 'react';
import SectionsReducer from './SectionsReducer';
import axios from 'axios';

const API_URL = 'http://localhost:49153/api/v1';

const SectionsContext = createContext();

export const SectionsProvider = ({ children }) => {
  const [firstSection, setFirstSection] = useState({});

  useEffect(async () => {
    const data = await axios.get(`${API_URL}/sections`);
    setFirstSection(data.data.data[0]);
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
