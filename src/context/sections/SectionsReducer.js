const SectionsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SECTION_TO_DISPLAY':
      return action.payload;
    default:
      return state;
  }
};

export default SectionsReducer;
