import React from "react";
import {
  View,
  StyleSheet,
  Platform,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput, ScrollView } from "react-native-gesture-handler";

export const Center: React.FC<{}> = ({ children }) => {
  return <View style={styles.centered}>{children}</View>;
};

export const ItemSeparator = () => <View style={styles.separator} />;

interface FormattedTextInputProps {
  onChangeText?: (text: string) => void,
  value?: string,
  placeholder?: string,
  err?: boolean,
  style?: any,
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad" | "number-pad" | "decimal-pad" | "visible-password" | "ascii-capable" | "numbers-and-punctuation" | "url" | "name-phone-pad" | "twitter" | "web-search"
}
export const FormattedTextInput: React.FC<FormattedTextInputProps> = ({
  onChangeText,
  value,
  err,
  placeholder,
  style,
  keyboardType
}) => {
  if (err === undefined) { err = false; }
  if (placeholder === undefined) { placeholder = ""; }
  return (
    <TextInput
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      underlineColorAndroid={err ? "red" : "teal"}
      style={StyleSheet.compose(styles.textInput, style)}
      keyboardType={keyboardType}
    />
  );
};

export const ScrollContainer: React.FC<{ style?: any }> = ({ style, children }) => {
  return (
    <ScrollView style={StyleSheet.compose(styles.container, style)}>
      {children}
    </ScrollView>
  );
};

export const Container: React.FC<{ style?: any }> = ({ style, children }) => {
  return (
    <View style={StyleSheet.compose(styles.container, style)}>{children}</View>
  );
};

export const KeyboardAvoidingScrollView: React.FC<{}> = ({ children }) => {
  return (
    <KeyboardAvoidingView
      contentContainerStyle={styles.kasvWrapper}
      behavior={Platform.OS === "ios" ? "height" : "padding"}
      enabled
      keyboardVerticalOffset={40}
    >
      <ScrollView contentContainerStyle={styles.kasvContainer}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const BigText: React.FC<{ style?: any }> = ({ style, children }) => {
  return (
    <Text style={StyleSheet.compose(styles.bigText, style)}>{children}</Text>
  );
};

export const BoldText: React.FC<{ style?: any }> = ({ style, children }) => {
  return (
    <Text style={StyleSheet.compose(styles.boldText, style)}>{children}</Text>
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
  boldText: {
    fontWeight: "bold",
  },

  kasvContainer: {
    padding: 20,
    paddingHorizontal: Platform.isPad ? 200 : 20,
    justifyContent: "center",
    // height: "100%",
  },
  kasvWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
