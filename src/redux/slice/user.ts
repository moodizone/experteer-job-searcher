import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { makeId, sleep } from "../../utils";

interface UserSliceType {
  session?: string;
  UUID?: string;
}

/**
 * simulate backend session generating
 */
const setSession = createAsyncThunk<string>("user/setSession", async () => {
  const session = makeId(10);
  await sleep(3000);
  return Promise.resolve(session);
});

const initialState: UserSliceType = {};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(setSession.fulfilled, (state, action) => {
      state.session = action.payload;
    });
  },
});

export { setSession };
export default userSlice.reducer;
