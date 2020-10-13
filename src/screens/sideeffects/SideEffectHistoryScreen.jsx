import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlatList, RectButton } from "react-native-gesture-handler";
import { ItemSeparator } from "../../components/formatted";
import { SideEffectContext } from "../../providers/SideEffectsProvider";
import { AddButton } from "../../components/AddButton";
import { AddableListView } from "../../components/AddableListView";

export const SideEffectListItem = ({ name, id, index, navigation }) => {
  return (
    <RectButton
      style={styles.listItemTouchable}
      onPress={() => {
        navigation.navigate("EditSideEffect", { name, id, index });
      }}
    >
      <View accessible>
        <Text style={styles.listItemText}>{name}</Text>
      </View>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  listItemTouchable: {
    padding: 15,
  },
  listItemText: {
    fontSize: 20,
  },
});

export const SideEffectHistoryScreen = ({ navigation }) => {
  const { state } = useContext(SideEffectContext);

  return (
    <AddableListView
      data={state}
      renderItem={({ item, index }) => (
        <SideEffectListItem
          name={item.name}
          id={item.id}
          index={index}
          navigation={navigation}
        />
      )}
      onAdd={() => navigation.navigate("NewSideEffect")}
    />
  );
};
