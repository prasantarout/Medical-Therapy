import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: {},
  error: {},
  getPatientResponse: {},
  getPatientSessionResponse: {},
  storeServiceEnrolmentRes: {},
  getListOfTherapiesRes: {},
};

const PATIENTSlice = createSlice({
  name: 'PATIENT',
  initialState,

  reducers: {
    //getPatientReq
    getPatientReq(state, action) {
      state.status = action.type;
    },
    getPatientSuccess(state, action) {
      state.getPatientResponse = action?.payload;
      state.status = action.type;
    },
    getPatientFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    // Patient Session
    getPatientSessionReq(state, action) {
      state.status = action.type;
    },
    getPatientSessionSuccess(state, action) {
      state.getPatientSessionResponse = action?.payload;
      state.status = action.type;
    },
    getPatientSessionFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    // Patient Session
    storeServiceEnrolmentReq(state, action) {
      state.status = action.type;
    },
    storeServiceEnrolmentSuccess(state, action) {
      state.storeServiceEnrolmentRes = action?.payload;
      state.status = action.type;
    },
    storeServiceEnrolmentFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    // Patient Session
    getListOfTherapiesReq(state, action) {
      state.status = action.type;
    },
    getListOfTherapiesSuccess(state, action) {
      state.getListOfTherapiesRes = action?.payload;
      state.status = action.type;
    },
    getListOfTherapiesFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
  },
});

export const {
  getPatientReq,
  getPatientSuccess,
  getPatientFailure,

  getPatientSessionReq,
  getPatientSessionSuccess,
  getPatientSessionFailure,

  storeServiceEnrolmentReq,
  storeServiceEnrolmentSuccess,
  storeServiceEnrolmentFailure,

  getListOfTherapiesReq,
  getListOfTherapiesSuccess,
  getListOfTherapiesFailure,
} = PATIENTSlice.actions;

export default PATIENTSlice.reducer;
