import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainTabs from "./MainTabs";
import { preinit } from "../lib/init";

// run before everything
preinit();

export const MainRoute: React.FC<{}> = () => {
  return (
    <NavigationContainer>
      {/* <MenuProvider> */}
      <MainTabs />
      {/* </MenuProvider> */}
    </NavigationContainer>
  );
};
