import React from "react";
import { View, StyleSheet } from "react-native";

export const Center = ({ children }) => {
  return <View style={styles.centered}>{children}</View>;
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
