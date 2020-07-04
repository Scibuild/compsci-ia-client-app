import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export const Center = ({ children }) => {
  return <View style={styles.centered}>{children}</View>;
};

export const ItemSeparator = () => <View style={styles.separator} />;

export const FormattedTextInput = ({
  onChangeText,
  value,
  err,
  placeholder,
}) => {
  return (
    <TextInput
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      underlineColorAndroid={err ? "red" : "teal"}
      style={styles.textInput}
    />
  );
};

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

  textInput: {
    margin: 10,
    padding: 5,
    fontSize: 20,
    alignSelf: "stretch",

    ...Platform.select({
      ios: {
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 4,
      },
      android: {},
    }),
  },
});
