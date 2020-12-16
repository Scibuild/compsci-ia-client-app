import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainTabs from "./MainTabs";
import { enableMapSet } from "immer";

enableMapSet();

export const MainRoute = () => {
  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
};
