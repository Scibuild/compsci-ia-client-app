import React from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  TouchableOpacity,
  TouchableHighlight,
  RectButton,
} from "react-native-gesture-handler";

export const Center = ({ children }) => {
  return <View style={styles.centered}>{children}</View>;
};

export const SideEffectListItem = ({ name, id, navigation }) => {
  return (
    <RectButton style={styles.listItemTouchable}>
      <Text style={styles.listItemText}>{name}</Text>
    </RectButton>
  );
};

export const ItemSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listItemTouchable: {
    padding: 15,
  },
  listItemText: {
    fontSize: 20,
  },
  separator: {
    height: 1,
    backgroundColor: "#DBDBE0",
  },
});
