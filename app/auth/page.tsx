"use client"
import { BackgroundLinesDemo } from "@/custom_components/userauth/BackgroundLinesDemo";
import React from "react";
import { Provider } from "react-redux";
import store from  "@/redux/store"

function page() {
  return (
    <>
    <Provider store={store}>
    <BackgroundLinesDemo/>
    </Provider>
    </>
  );
}

export default page;
