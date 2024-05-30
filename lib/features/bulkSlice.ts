import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface bulkState {
  bulk: {
    ids:string[],
    client:string
  };
}

const initialState: bulkState = {
  bulk: {
    ids:[],
    client:""
  },
};

const bulkSlice = createSlice({
  name: "bulk",
  initialState,
  reducers: {
    updateBulkData: (state, action: PayloadAction<Partial<bulkState["bulk"]>>) => {
      state.bulk = { ...state.bulk, ...action.payload };
    },
    
  },
});

export const { updateBulkData } = bulkSlice.actions;
export default bulkSlice.reducer;
