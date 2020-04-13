import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

const initialState = {
     currentAppData: [],
     users: [],
     filterText: "",
     loading: true,
     error: null,
     instrument: {},
     editMode: false,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
     const [state, dispatch] = useReducer(AppReducer, initialState);

     //Actions
     const addInstrument = async (instrument) => {
          try {
               await axios.post(`api/listings/`, instrument);
               dispatch({
                    type: "ADD_INSTRUMENT",
                    payload: instrument,
               });
          } catch (error) {
               dispatch({
                    type: "INSTRUMENT_ERROR",
                    payload: error.response.data.error,
               });
          }
     };

     const updateInstrument = async (id, instrument) => {
          try {
               let res = await axios.put(`api/listings/${id}`, instrument);
               dispatch({
                    type: "UPDATE_INSTRUMENT",
                    payload: res.data,
               });
          } catch (error) {
               dispatch({
                    type: "INSTRUMENT_ERROR",
                    payload: error.response.data.error,
               });
          }
     };



     const deleteInstrument = async (id) => {
          try {
               await axios.delete(`api/listings/${id}`);
               dispatch({
                    type: "DELETE_INSTRUMENT",
                    payload: id,
               });
          } catch (error) {
               dispatch({
                    type: "INSTRUMENT_ERROR",
                    payload: error.response.data.error,
               });
          }
     };

     const getInstruments = async () => {
          try {
               console.log("bruh");
               console.time("lol");
               const res = await axios.get("api/listings/");
               dispatch({
                    type: "GET_INSTRUMENTS",
                    payload: res.data.data,
               });
               var retTime = console.timeEnd("lol");
               console.log(retTime);
          } catch (error) {
               dispatch({
                    type: "INSTRUMENT_ERROR",
                    payload: error.response.data.error,
               });
          }
     };

     const getUsers = async () => {
          try {
               const res = await axios.get("api/users/");
               dispatch({
                    type: "GET_USERS",
                    payload: res.data,
               });
          } catch (error) {
               dispatch({
                    type: "INSTRUMENT_ERROR",
                    payload: error.response.data.error,
               });
          }
     };


     const setFilterText = (text) => {
          dispatch({
               type: "SET_FILTERTEXT",
               payload: text,
          });
     };

     const setEditMode = (mode) => {
          dispatch({
               type: "SET_EDITMODE",
               payload: mode,
          });
     };

     const setInstrument = (mode) => {
          dispatch({
               type: "SET_INSTRUMENT",
               payload: mode,
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
                    getInstruments,
                    addInstrument,
                    deleteInstrument,
                    setFilterText,
                    setEditMode,
                    getUsers,
                    setInstrument,
                    updateInstrument    
               }}>
               {children}
          </GlobalContext.Provider>
     );
};
