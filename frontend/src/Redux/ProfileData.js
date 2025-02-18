import { createSlice } from "@reduxjs/toolkit";

// 初始状态
const initialState = {
  profileData: [],
};

// 创建 slice
const userProfileSlice = createSlice({
  name: "userProfile", // slice 的名称
  initialState, // 初始状态
  reducers: {
    // 定义一个 reducer：saveProfileData
    saveProfileData: (state, action) => {
      state.profileData = action.payload; // 更新 profileData
    },
  },
});

// 导出 action 和 reducer
export const { saveProfileData } = userProfileSlice.actions;
export default userProfileSlice.reducer;
