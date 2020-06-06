import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { Center } from "../components/formatted";
import { SideEffectContext } from "../providers/SymptomsProvider";
import { ScrollView } from "react-native-gesture-handler";

export const EditSideEffectScreen = ({ route }) => {
  const { state, addSideEffect } = useContext(SideEffectContext);
  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
      <Center>
        <Text>
          You are editing {route.params.name}!{"\n"}
          The id is: {route.params.id}
          {"\n"}
          {JSON.stringify(state[route.params.index].instances, null, 2)}
        </Text>
        <Button
          title="add magic side effect"
          onPress={() => {
            addSideEffect({
              name: "Discombobulation",
              instance: {
                time: "all the time",
                severity: Math.floor(Math.random() * 10),
              },
            });
          }}
        />
      </Center>
    </ScrollView>
  );
};
