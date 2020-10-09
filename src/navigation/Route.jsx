import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainTabs from "./MainTabs";

export const MainRoute = () => {
  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
};
