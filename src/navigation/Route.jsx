import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import SideEffectsStackRoute from "./SideEffectsStackRoute";
import MainTabs from "./MainTabs";

export const MainRoute = () => {
  return (
    <NavigationContainer>
      <MainTabs></MainTabs>
    </NavigationContainer>
  );
};
