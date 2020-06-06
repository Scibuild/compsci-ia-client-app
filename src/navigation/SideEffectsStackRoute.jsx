import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NewSideEffectScreen } from "../screens/NewSideEffectScreen";
import { SideEffectHistoryScreen } from "../screens/SideEffectHistoryScreen";
import { EditSideEffectScreen } from "../screens/EditSideEffectScreen";
import { SymptomsProvider } from "../providers/SymptomsProvider";

const Stack = createStackNavigator();

const SideEffectsStackRoute = () => {
  return (
    <SymptomsProvider>
      <Stack.Navigator initialRouteName="History">
        <Stack.Screen
          name="History"
          component={SideEffectHistoryScreen}
          options={({ routes }) => ({ title: "Side Effect History" })}
        />
        <Stack.Screen name="NewSideEffect" component={NewSideEffectScreen} />
        <Stack.Screen name="EditSideEffect" component={EditSideEffectScreen} />
      </Stack.Navigator>
    </SymptomsProvider>
  );
};

export default SideEffectsStackRoute;
