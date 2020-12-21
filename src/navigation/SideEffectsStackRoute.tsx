import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NewSideEffectScreen } from "../screens/sideeffects/NewSideEffectScreen";
import { SideEffectHistoryScreen } from "../screens/sideeffects/SideEffectHistoryScreen";
import { ViewSideEffectScreen } from "../screens/sideeffects/ViewSideEffectScreen";

export type SideEffectsParamList = {
  History: undefined;
  NewSideEffect: undefined;
  ViewSideEffect: { name: string, id: string, index: number };
}

const Stack = createStackNavigator<SideEffectsParamList>();

const SideEffectsStackRoute: React.FC<{}> = () => {
  return (
    <Stack.Navigator initialRouteName="History">
      <Stack.Screen
        name="History"
        component={SideEffectHistoryScreen}
        options={() => ({ title: "Side Effect History" })}
      />
      <Stack.Screen name="NewSideEffect" component={NewSideEffectScreen} />
      <Stack.Screen
        name="ViewSideEffect"
        component={ViewSideEffectScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  );
};

export default SideEffectsStackRoute;
