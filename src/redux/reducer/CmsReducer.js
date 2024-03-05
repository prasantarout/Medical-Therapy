import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: {},
  error: {},
  getCategoryResponse: {},
  helpSupportTypeResponse: {},
  helpAndSupportResponse: {},
  contactUsForSupportResponse: {},
  updatePasswordResponse: {},
};

const CmsSlice = createSlice({
  name: 'CMS',
  initialState,

  reducers: {
    //getCategoryReq
    getCategoryReq(state, action) {
      state.status = action.type;
    },
    getCategorySuccess(state, action) {
      state.getCategoryResponse = action?.payload;
      state.status = action.type;
    },
    getCategoryFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //Help and Support Types
    helpSupportTypeReq(state, action) {
      state.status = action.type;
    },
    helpSupportTypeSuccess(state, action) {
      state.helpSupportTypeResponse = action?.payload;
      state.status = action.type;
    },
    helpSupportTypeFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //Help and Support
    helpAndSupportReq(state, action) {
      state.status = action.type;
    },
    helpAndSupportSuccess(state, action) {
      state.helpAndSupportResponse = action?.payload;
      state.status = action.type;
    },
    helpAndSupportFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    // Contact Us for support
    contactUsForSupportReq(state, action) {
      state.status = action.type;
    },
    contactUsForSupportSuccess(state, action) {
      state.contactUsForSupportResponse = action?.payload;
      state.status = action.type;
    },
    contactUsForSupportFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    // Update Password
    updatePasswordReq(state, action) {
      state.status = action.type;
    },
    updatePasswordSuccess(state, action) {
      state.updatePasswordResponse = action?.payload;
      state.status = action.type;
    },
    updatePasswordFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
  },
});

export const {
  getCategoryReq,
  getCategorySuccess,
  getCategoryFailure,

  helpSupportTypeReq,
  helpSupportTypeSuccess,
  helpSupportTypeFailure,

  helpAndSupportReq,
  helpAndSupportSuccess,
  helpAndSupportFailure,

  contactUsForSupportReq,
  contactUsForSupportSuccess,
  contactUsForSupportFailure,

  updatePasswordReq,
  updatePasswordSuccess,
  updatePasswordFailure,

} = CmsSlice.actions;

export default CmsSlice.reducer;
