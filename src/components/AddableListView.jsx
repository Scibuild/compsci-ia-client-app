import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ItemSeparator } from "./formatted";
import { AddButton } from "./AddButton";

export const AddableListView = ({ data, renderItem, onAdd }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item, index) => index.toString()}
      />
      <AddButton onPress={onAdd} />
    </View>
  );
};
