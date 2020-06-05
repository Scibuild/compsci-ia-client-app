import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NewSideEffectScreen } from "../screens/NewSideEffectScreen";
import { SdieEffectHistoryScreen } from "../screens/SideEffectHistoryScreen";
import { EditSideEffectScreen } from "../screens/EditSideEffectScreen";

const Stack = createStackNavigator();

const SideEffectsStackRoute = () => {
  return (
    <Stack.Navigator initialRouteName="History">
      <Stack.Screen name="History" component={SdieEffectHistoryScreen} />
      <Stack.Screen name="NewSideEffect" component={NewSideEffectScreen} />
      <Stack.Screen name="EditSideEffect" component={EditSideEffectScreen} />
    </Stack.Navigator>
  );
};

export default SideEffectsStackRoute;
