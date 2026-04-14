import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resumeData: {},
  template: "template1",   // ✅ added
};

export const resumeSlice = createSlice({
  name: "editResume",
  initialState,
  reducers: {
    addResumeData: (state, action) => {
      state.resumeData = action.payload;
    },

    setTemplate: (state, action) => {   // ✅ added
      state.template = action.payload;
    },
  },
});

// Export actions
export const { addResumeData, setTemplate } = resumeSlice.actions;

// Export reducer
export default resumeSlice.reducer;