import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { JobType } from "../../api/type";

interface JobStateType {
  appliedList: JobType["Guid"][];
  result?: JobType[];
}

const initialState: JobStateType = {
  appliedList: [],
};
const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    apply: (state, action: PayloadAction<string>) => {
      state.appliedList.push(action.payload);
    },
    setResults: (state, action: PayloadAction<JobType[] | undefined>) => {
      state.result = action.payload;
    },
    clearResults: (state) => {
      state.result = undefined;
    },
  },
});

export const { apply, setResults, clearResults } = jobsSlice.actions;
export default jobsSlice.reducer;
