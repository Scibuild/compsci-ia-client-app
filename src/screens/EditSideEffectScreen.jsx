import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { Center } from "../components/formatted";
import { SideEffectContext } from "../providers/SideEffectsProvider";
import { ScrollView } from "react-native-gesture-handler";
import { AddButton } from "../components/AddButton";

export const EditSideEffectScreen = ({ route, navigation }) => {
  const { state, deleteSideEffectById } = useContext(SideEffectContext);
  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
      <Center>
        <Text>
          You are editing {route.params.name}!{"\n"}
          The id is: {route.params.id}
          {"\n"}
          {state[route.params.index]
            ? JSON.stringify(state[route.params.index].instances, null, 2)
            : null}
        </Text>
        <Button
          title="Delete"
          onPress={() => {
            console.log(route.params);
            deleteSideEffectById(route.params.id);
            navigation.goBack();
          }}
        />
      </Center>
    </ScrollView>
  );
};
