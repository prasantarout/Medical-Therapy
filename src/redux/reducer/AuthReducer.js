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
  forgotPasswordResponse: {},
  editProfileResponse: {},
  NotificationListRes: {},
  enableOrDisableNotificationRes: {},
  changePasswordRes: {},
  logoutRes: {},
  resendOtpRes: {},
  resetPasswordRes:{}
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
    // my-patients
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

    //
    //////////////////// forgotPassword /////////////////////
    forgotPasswordRequest(state, action) {
      state.status = action.type;
    },
    forgotPasswordSuccess(state, action) {
      state.forgotPasswordResponse = action?.payload;
      state.status = action.type;
    },
    forgotPasswordFailure(state, action) {
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

    //////////////////// Edit Profile /////////////////////
    editProfileRequest(state, action) {
      state.status = action.type;
    },
    editProfileSuccess(state, action) {
      state.editProfileResponse = action?.payload;
      state.status = action.type;
    },
    editProfileFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //////////////////// Notification list /////////////////////
    notificationListRequest(state, action) {
      state.status = action.type;
    },
    notificationListSuccess(state, action) {
      state.NotificationListRes = action?.payload;
      state.status = action.type;
    },
    notificationListFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //////////////////// Notification list /////////////////////
    EnableDisableNotificationListRequest(state, action) {
      state.status = action.type;
    },
    EnableDisableNotificationListSuccess(state, action) {
      state.enableOrDisableNotificationRes = action?.payload;
      state.status = action.type;
    },
    EnableDisableNotificationListFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //////////////////// Notification list /////////////////////
    changePasswordRequest(state, action) {
      state.status = action.type;
    },
    changePasswordSuccess(state, action) {
      state.changePasswordRes = action?.payload;
      state.status = action.type;
    },
    changePasswordFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    LogoutRequest(state, action) {
      state.status = action.type;
    },
    LogoutSuccess(state, action) {
      state.logoutRes = action?.payload;
      state.status = action.type;
    },
    LogoutFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    ResendOtpRequest(state, action) {
      state.status = action.type;
    },
    ResendOtpSuccess(state, action) {
      state.resendOtpRes = action?.payload;
      state.status = action.type;
    },
    ResendOtpFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    ResetPasswordRequest(state, action) {
      state.status = action.type;
    },
    ResetPasswordSuccess(state, action) {
      state.resetPasswordRes = action?.payload;
      state.status = action.type;
    },
    ResetPasswordFailure(state, action) {
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

  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,

  editProfileRequest,
  editProfileSuccess,
  editProfileFailure,

  notificationListRequest,
  notificationListSuccess,
  notificationListFailure,

  EnableDisableNotificationListRequest,
  EnableDisableNotificationListSuccess,
  EnableDisableNotificationListFailure,

  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFailure,

  LogoutRequest,
  LogoutSuccess,
  LogoutFailure,

  ResendOtpRequest,
  ResendOtpSuccess,
  ResendOtpFailure,

  ResetPasswordRequest,
  ResetPasswordSuccess,
  ResetPasswordFailure,
} = AuthSlice.actions;

export default AuthSlice.reducer;
