import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: {},
  error: {},
  getDashboardResponse: {},
};

const DashboardSlice = createSlice({
  name: 'Dashboard',
  initialState,

  reducers: {
    //getDashboardReq
    getDashboardReq(state, action) {
      state.status = action.type;
    },
    getDashboardSuccess(state, action) {
      state.getDashboardResponse = action?.payload;
      state.status = action.type;
    },
    getDashboardFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },   
  },
});

export const {
  getDashboardReq,
  getDashboardSuccess,
  getDashboardFailure,

} = DashboardSlice.actions;

export default DashboardSlice.reducer;
