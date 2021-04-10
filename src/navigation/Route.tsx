import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import MainTabs from "./MainTabs";
import { preinit } from "../lib/init";

// run before everything
preinit();

// const AppTheme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors
//     1
//   }
// }

export const MainRoute: React.FC<{}> = () => {
  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
};
