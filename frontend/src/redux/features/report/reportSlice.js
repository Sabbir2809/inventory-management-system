import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenseDataList: [],
  sellDataList: [],
  purchaseDataList: [],
  returnDataList: [],
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setExpenseDataList: (state, action) => {
      state.expenseDataList = action.payload;
    },
    setSellDataList: (state, action) => {
      state.sellDataList = action.payload;
    },
    setPurchaseDataList: (state, action) => {
      state.purchaseDataList = action.payload;
    },
    setReturnDataList: (state, action) => {
      state.returnDataList = action.payload;
    },
  },
});

export const { setExpenseDataList, setSellDataList, setPurchaseDataList, setReturnDataList } =
  reportSlice.actions;
export default reportSlice.reducer;
