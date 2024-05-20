"use client"
import React,{ ReactNode } from "react";
import {Provider} from "react-redux"
import { store } from './../lib/store';

const ProviderCom = ({children}:{children:ReactNode}) => {
  return <div>
    <Provider store={store}>
    {children}
    </Provider>
    </div>;
};

export default ProviderCom;
0