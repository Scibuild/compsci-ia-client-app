import React from "react";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { NewSideEffectScreen } from "../screens/sideeffects/NewSideEffectScreen";
import { SideEffectHistoryScreen } from "../screens/sideeffects/SideEffectHistoryScreen";
import { ViewSideEffectScreen } from "../screens/sideeffects/ViewSideEffectScreen";
import { HeaderButton, HeaderButtonContainer } from "../components/HeaderButton";
import { SideEffectsStoreState, useSideEffectStore } from "../providers/SideEffectsStore";

export type SideEffectsParamList = {
  History: undefined;
  NewSideEffect: undefined;
  ViewSideEffect: { name: string, id: string, index: number };
}

const Stack = createStackNavigator<SideEffectsParamList>();

const deleteSideEffectSelector = (s: SideEffectsStoreState) => s.deleteSideEffectById;
const SideEffectsStackRoute: React.FC<{}> = () => {
  const deleteSideEffect = useSideEffectStore(deleteSideEffectSelector);
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
        options={({ route, navigation }) => ({
          title: route.params.name,
          headerRight: viewHeaderRight(() => {
            deleteSideEffect(route.params.id);
            console.log("back")
            navigation.navigate("History");
          })
        })}
      />
    </Stack.Navigator>
  );
};


const viewHeaderRight = (deleteSideEffect: () => void) => () => {
  return (
    <HeaderButtonContainer>
      <HeaderButton onPress={deleteSideEffect} icon="delete" />
    </HeaderButtonContainer>
  );
};

export default SideEffectsStackRoute;
