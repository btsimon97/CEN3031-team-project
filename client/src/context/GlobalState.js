import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';
import Search from '../components/Search';

const initialState = {
  currentAppData: [],
  users: [],
  filterText: '',
  loading: true,
  error: null,
  instrument: {},
  editMode: false,
  currentUser: null,
  uploadedImage: {
    fileName: '',
    filePath: '',
  },
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Actions
  const addInstrument = async (instrument) => {
    try {
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      let res = await axios.post(`api/listings/`, instrument, config);
      const { fileName, filePath } = res.data;
      console.log(res.data);
      let file = { fileName: fileName, filePath: filePath };
      dispatch({
        type: 'ADD_INSTRUMENT',
        payload: { instrument: res.data.data, uploadedImage: file },
      });
    } catch (error) {
      console.log(error);
      // dispatch({
      //   type: 'INSTRUMENT_ERROR',
      //   payload: error.response.data.error,
      // });
    }
  };

  const updateInstrument = async (id, instrument) => {
    try {
      let res = await axios.put(`api/listings/${id}`, instrument);
      dispatch({
        type: 'UPDATE_INSTRUMENT',
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: 'INSTRUMENT_ERROR',
        payload: error.response.data.error,
      });
    }
  };

  const deleteInstrument = async (id) => {
    try {
      await axios.delete(`api/listings/${id}`);
      dispatch({
        type: 'DELETE_INSTRUMENT',
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: 'INSTRUMENT_ERROR',
        payload: error.response.data.error,
      });
    }
  };
  // const NS_PER_SEC = 1e9;
  const getInstruments = async () => {
    try {
      var t0 = performance.now();
      const res = await axios.get('api/listings/');
      dispatch({
        type: 'GET_INSTRUMENTS',
        payload: res.data.data,
      });
      var t1 = performance.now();
      // Search.timeDiff = t1 - t0;
      // Search.setTimeDiff(t1 - t0);
      // console.log(Search.timeDiff);
      // console.log('Call to get all took ' + (t1 - t0) + ' milliseconds.');
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'INSTRUMENT_ERROR',
        payload: error.response.data.error,
      });
    }
  };

  const getUsers = async () => {
    try {
      const res = await axios.get('api/users/');
      dispatch({
        type: 'GET_USERS',
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: 'INSTRUMENT_ERROR',
        payload: error.response.data.error,
      });
    }
  };

  const setFilterText = (text) => {
    dispatch({
      type: 'SET_FILTERTEXT',
      payload: text,
    });
  };

  const setEditMode = (mode) => {
    dispatch({
      type: 'SET_EDITMODE',
      payload: mode,
    });
  };

  const setInstrument = (instrument) => {
    dispatch({
      type: 'SET_INSTRUMENT',
      payload: instrument,
    });
  };

  const setUploadedImage = (img) => {
    dispatch({
      type: 'SET_UPLOADEDIMAGE',
      payload: img,
    });
  };

  const setCurrentUser = (user) => {
    dispatch({
      type: 'SET_CURRENT_USER',
      payload: user,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        currentAppData: state.currentAppData,
        loading: state.loading,
        error: state.error,
        filterText: state.filterText,
        instrument: state.instrument,
        editMode: state.editMode,
        users: state.users,
        currentUser: state.currentUser,
        uploadedImage: state.uploadedImage,
        getInstruments,
        addInstrument,
        deleteInstrument,
        setFilterText,
        setEditMode,
        getUsers,
        setInstrument,
        updateInstrument,
        setCurrentUser,
        setUploadedImage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
