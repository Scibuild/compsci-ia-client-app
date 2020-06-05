import React from "react";
import { View, StyleSheet } from "react-native";

export const Center = ({ children }) => {
  return <View style={styles.centered}>{children}</View>;
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
