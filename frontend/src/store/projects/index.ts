import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projectList: [],
  },
  reducers: {
    updateProjectList: (state, action) => {
      state.projectList = action.payload;
    },
  },
});

export const { updateProjectList } = projectSlice.actions;
export default projectSlice.reducer;
