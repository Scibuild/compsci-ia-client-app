import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainTabs from "./MainTabs";
import { preinit, init } from "../lib/init";

// run before everything
preinit();

export const MainRoute = () => {
  React.useEffect(init, []);
  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
};
