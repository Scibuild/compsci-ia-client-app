import React from "react";
import { View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const RANDOMNUMBERS = Array(50)
  .fill()
  .map(() => ({ num: Math.floor(Math.random() * 100) }));

export const SdieEffectHistoryScreen = () => {
  return (
    <View>
      <FlatList
        data={RANDOMNUMBERS}
        renderItem={({ item }) => (
          <Text>{JSON.stringify(item.num, null, 2)}</Text>
        )}
      />
    </View>
  );
};
