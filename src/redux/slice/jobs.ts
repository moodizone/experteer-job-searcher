import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface JobStateType {
  appliedList: string[];
}
interface JobActionType {
  [apply: string]: (state: JobStateType, action: PayloadAction<string>) => void;
}

const initialState: JobStateType = {
  appliedList: [],
};
const jobsSlice = createSlice<JobStateType, JobActionType, "jobs">({
  name: "jobs",
  initialState,
  reducers: {
    apply: (state, action) => {
      state.appliedList.push(action.payload);
    },
  },
});

export const { apply } = jobsSlice.actions;
export default jobsSlice.reducer;
