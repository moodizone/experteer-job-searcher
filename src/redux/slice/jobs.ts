import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QueryType {
  Query: string;
  Limit: string;
}
export interface JobsType {
  Title: string;
  Description: string;
  Location: string;
  Published: string;
  Company: string;
  Guid: string;
  Url: string;
}
export interface SearchResults {
  Jobs: JobsType[] | null;
  Query: QueryType;
  Session: string;
  Status: "failed" | "succeed";
  UUID: string;
}
interface JobStateType {
  appliedList: JobsType["Guid"][];
  result?: SearchResults;
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
    setResults: (state, action: PayloadAction<SearchResults>) => {
      state.result = action.payload;
    },
  },
});

export const { apply, setResults } = jobsSlice.actions;
export default jobsSlice.reducer;
