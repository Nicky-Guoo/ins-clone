import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postData: [],
};

export const postDataSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    savePostData: (state, action) => {
      state.postData = action.payload;
    },

    handleLikeSingleClick: (state, action) => {
      const updatedPost = action.payload;
      const postIndex = state.postData.findIndex(
        (post) => post.postID === updatedPost.postID
      );
      console.log("updatedPost", updatedPost, postIndex);
      if (postIndex !== -1) {
        state.postData[postIndex] = updatedPost;
      }
    },
  },
});

export const { savePostData, handleLikeSingleClick } = postDataSlice.actions;
export default postDataSlice.reducer;
