import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import SideEffectsStackRoute from "./SideEffectsStackRoute";

export const MainRoute = () => {
  return (
    <NavigationContainer>
      <SideEffectsStackRoute />
    </NavigationContainer>
  );
};
