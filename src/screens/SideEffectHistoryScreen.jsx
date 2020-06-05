import React from "react";
import { View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SideEffectListItem, ItemSeparator } from "../components/formatted";

const RANDOMNUMBERS = Array(50)
  .fill()
  .map(() => ({ num: Math.floor(Math.random() * 100) }));

export const SdieEffectHistoryScreen = () => {
  return (
    <View>
      <FlatList
        data={RANDOMNUMBERS}
        renderItem={({ item, index }) => (
          <SideEffectListItem name={item.num} id={index} />
        )}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};
