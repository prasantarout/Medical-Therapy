import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: {},
  error: {},
  getCategoryResponse: {},
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

  },
});

export const {

  getCategoryReq,
  getCategorySuccess,
  getCategoryFailure,

} = CmsSlice.actions;

export default CmsSlice.reducer;
