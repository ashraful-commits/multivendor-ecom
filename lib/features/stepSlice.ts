import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CheckoutFormData } from '../../typescript';

interface CheckoutState {
  currentStep: number;
  checkoutFormData:CheckoutFormData
}

const initialState: CheckoutState = {
  currentStep: 1,
  checkoutFormData: {
  lastName:"",
  email:"",
  phone:"",
  shippingCost:0,
  paymentMethod:"",
  firstName:"",
  userId: "",
  zipCode:"",
  streetAddress:"",
  city:"",
  country:"",
  orderStatus:false
  },
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    updateCheckoutFormData: (state, action: PayloadAction<Partial<CheckoutState["checkoutFormData"]>>) => {
      state.checkoutFormData = {...state.checkoutFormData, ...action.payload};
    },
  },
});

export const { setCurrentStep, updateCheckoutFormData } = checkoutSlice.actions;
export default checkoutSlice.reducer;
