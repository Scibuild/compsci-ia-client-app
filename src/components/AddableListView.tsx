import React from "react";
import { ListRenderItem, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ItemSeparator } from "./formatted";
import { AddButton } from "./AddButton";

type AddableListViewProps<T> = { data: Array<T>, renderItem: ListRenderItem<T>, onAdd: any }
export const AddableListView: React.FC<AddableListViewProps<any>> = ({ data, renderItem, onAdd }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item, index) => item.id || index.toString()}
      />
      <AddButton onPress={onAdd} />
    </View>
  );
};
