import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  filter: {
    search: string;
    category: string;
    brand: string;
    tag:string[];
    minPrice: number;
    maxPrice: number;
  };
}

const initialState: FilterState = {
  filter: {
    search: "",
    category: "",
    brand: "",
    tag: [],
    minPrice: 0,
    maxPrice: 10000,
  },
};

const FilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateFilterData: (state, action: PayloadAction<Partial<FilterState["filter"]>>) => {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
});

export const { updateFilterData } = FilterSlice.actions;
export default FilterSlice.reducer;
