import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlatList, RectButton } from "react-native-gesture-handler";
import { ItemSeparator } from "../components/formatted";
import { SideEffectContext } from "../providers/SideEffectsProvider";
import { AddButton } from "../components/AddButton";

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
    <View style={{ flex: 1 }}>
      <FlatList
        data={state}
        renderItem={({ item, index }) => (
          <SideEffectListItem
            name={item.name}
            id={item.id}
            index={index}
            navigation={navigation}
          />
        )}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item, index) => index.toString()}
      />
      <AddButton onPress={() => navigation.navigate("NewSideEffect")} />
    </View>
  );
};
