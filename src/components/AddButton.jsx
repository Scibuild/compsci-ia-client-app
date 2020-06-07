import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, Platform, View } from "react-native";

export const AddButton = ({ onPress }) => {
  return (
    <View style={styles.plusButtonContainer}>
      <TouchableOpacity style={styles.plusButton} onPress={onPress}>
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  plusButtonContainer: {
    position: "absolute",
    bottom: 30,
    right: 30,
  },
  plusButton: {
    // position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    // bottom: 10,
    // right: 30,
    borderRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
    backgroundColor: "#ff7777",
  },
});
