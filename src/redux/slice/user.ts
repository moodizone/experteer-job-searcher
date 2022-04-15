import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { makeId, sleep } from "../../utils";
import { baseURL } from "../../constant/baseURL";

interface UserSliceType {
  session?: string;
  UUID?: string;
}
interface SetUUIDParam {
  query: string;
  location: string;
  session: string;
}

/**
 * simulate backend session generating
 */
const setSession = createAsyncThunk<string>("user/setSession", async () => {
  const session = makeId(10);
  await sleep(3000);
  return Promise.resolve(session);
});
const setUUID = createAsyncThunk<string, SetUUIDParam>(
  "user/setUUID",
  async ({ query, location, session }) => {
    const rawResponse = await fetch(
      `${baseURL}/search?query=${query}&location=${location}&session=${session}`,
      { method: "POST" }
    );
    return await rawResponse.text();
  }
);
const initialState: UserSliceType = {};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(setSession.fulfilled, (state, action) => {
      state.session = action.payload;
    });
    builder.addCase(setUUID.fulfilled, (state, action) => {
      state.UUID = action.payload;
    });
  },
});

export { setSession ,setUUID};
export default userSlice.reducer;
