import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: {},
  error: {},
  getUpcomingAssignmentsResponse: {},
};

const AssignmentsSlice = createSlice({
  name: 'Assignments',
  initialState,

  reducers: {
    //getUpcomingAssignmentsReq
    // getUpcomingAssignmentsReq(state, action) {
    //   state.status = action.type;
    // },
    // getUpcomingAssignmentsSuccess(state, action) {
    //   state.getUpcomingAssignmentsResponse = action?.payload;
    //   state.status = action.type;
    // },
    // getUpcomingAssignmentsFailure(state, action) {
    //   state.error = action.error;
    //   state.status = action.type;
    // },
  },
});

export const {
  // getUpcomingAssignmentsReq,
  // getUpcomingAssignmentsSuccess,
  // getUpcomingAssignmentsFailure,

} = AssignmentsSlice.actions;

export default AssignmentsSlice.reducer;
