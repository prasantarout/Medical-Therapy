import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: {},
  token: null,
  isLoading: true,
  isInstalled: 'true',
  error: {},
  signUpRes: {},
  signInResponse: {},
  verifyOtpResponse: {},
  logoutResponse: {},
  ProfileResponse: {},
};

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,

  reducers: {
    //TOKEN
    getTokenRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    getTokenSuccess(state, action) {
      state.isLoading = false;
      state.token = action.payload;
      state.status = action.type;
    },
    getTokenFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },

    //signUpReq
    signUpReq(state, action) {
      state.status = action.type;
    },
    signUpSucces(state, action) {
      state.signUpRes = action?.payload;
      state.status = action.type;
    },
    signUpFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    checkInstalled(state, action) {
      if (action.payload == null) {
        state.isInstalled = 'false';
      } else {
        state.isInstalled = action.payload;
      }
    },

    //////////////////// otp verify ///////////////
    verifyOtpRequest(state, action) {
      state.status = action.type;
    },
    verifyOtpSuccess(state, action) {
      state.verifyOtpResponse = action?.payload;
      state.status = action.type;
    },
    verifyOtpFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //////////////////// signIn /////////////////////
    signInRequest(state, action) {
      state.status = action.type;
    },
    signInSuccess(state, action) {
      state.signInResponse = action?.payload;
      state.status = action.type;
    },
    signInFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //////////////////// logout /////////////////////
    logoutRequest(state, action) {
      state.status = action.type;
    },
    logoutSuccess(state, action) {
      state.logoutResponse = action?.payload;
      state.status = action.type;
    },
    logoutFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //////////////////// Profile /////////////////////
    ProfileRequest(state, action) {
      state.status = action.type;
    },
    ProfileSuccess(state, action) {
      state.ProfileResponse = action?.payload;
      state.status = action.type;
    },
    ProfileFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
  },
});

export const {
  getTokenRequest,
  getTokenSuccess,
  getTokenFailure,

  signUpReq,
  signUpSucces,
  signUpFailure,

  signInRequest,
  signInSuccess,
  signInFailure,

  verifyOtpRequest,
  verifyOtpSuccess,
  verifyOtpFailure,

  checkInstalled,

  logoutRequest,
  logoutSuccess,
  logoutFailure,

  ProfileRequest,
  ProfileSuccess,
  ProfileFailure,
} = AuthSlice.actions;

export default AuthSlice.reducer;
