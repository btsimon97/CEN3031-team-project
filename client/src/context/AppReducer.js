export default (state, action) => {
  switch (action.type) {
    case 'ADD_INSTRUMENT':
      return {
        ...state,
        currentAppData: [...state.currentAppData, action.payload],
      };
    case 'UPDATE_INSTRUMENT':
      return {
        ...state,
      };

    case 'SET_INSTRUMENT':
      return {
        ...state,
        instrument: action.payload,
      };
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload,
      };

    case 'GET_INSTRUMENTS':
      return {
        ...state,
        loading: false,
        currentAppData: action.payload,
      };

    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
      };

    case 'DELETE_INSTRUMENT':
      return {
        ...state,
        currentAppData: state.currentAppData.filter(
          (instrument) => instrument._id !== action.payload,
        ),
      };

    case 'SET_FILTERTEXT':
      return {
        ...state,
        filterText: action.payload,
      };

    case 'SET_EDITMODE':
      return {
        ...state,
        editMode: action.payload,
      };

    default:
      return state;
  }
};
