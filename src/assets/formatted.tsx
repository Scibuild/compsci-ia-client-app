import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

interface CenterProps {
  children?: ReactNode;
}

export const Center = ({ children }: CenterProps) => {
  return <View style={styles.centered}>{children}</View>;
};


const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
