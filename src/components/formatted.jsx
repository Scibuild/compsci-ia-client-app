import React from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
import { TextInput, ScrollView } from "react-native-gesture-handler";

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
  if (err === undefined) {
    err = false;
  }
  if (placeholder === undefined) {
    placeholder = "";
  }
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

export const ScrollContainer = ({ style, children }) => {
  return (
    <ScrollView style={StyleSheet.compose(styles.container, style)}>
      {children}
    </ScrollView>
  );
};

export const Container = ({ style, children }) => {
  return (
    <View style={StyleSheet.compose(styles.container, style)}>{children}</View>
  );
};

export const BigText = ({ style, children }) => {
  return (
    <Text style={StyleSheet.compose(styles.container, style)}>{children}</Text>
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
  container: {
    flex: 1,
    padding: 20,
  },
  bigText: {
    fontSize: 20,
  },
});
