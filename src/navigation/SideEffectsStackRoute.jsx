import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NewSideEffectScreen } from "../screens/sideeffects/NewSideEffectScreen";
import { SideEffectHistoryScreen } from "../screens/sideeffects/SideEffectHistoryScreen";
import { EditSideEffectScreen } from "../screens/sideeffects/EditSideEffectScreen";
import { SideEffectsProvider } from "../providers/SideEffectsProvider";

const Stack = createStackNavigator();

const SideEffectsStackRoute = () => {
  return (
    <SideEffectsProvider>
      <Stack.Navigator initialRouteName="History">
        <Stack.Screen
          name="History"
          component={SideEffectHistoryScreen}
          options={() => ({ title: "Side Effect History" })}
        />
        <Stack.Screen name="NewSideEffect" component={NewSideEffectScreen} />
        <Stack.Screen
          name="EditSideEffect"
          component={EditSideEffectScreen}
          options={({ route }) => ({ title: route.params.name })}
        />
      </Stack.Navigator>
    </SideEffectsProvider>
  );
};

export default SideEffectsStackRoute;
