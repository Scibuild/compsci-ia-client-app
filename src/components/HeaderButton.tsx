import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

interface HeaderButtonProps {
  onPress: () => void,
  icon: string
}

export const HeaderButton: React.FC<HeaderButtonProps> = ({ onPress, icon }) => {
  return (
    <TouchableNativeFeedback
      onPress={onPress}
      style={styles.headerButton}
    >
      <AntDesign name={icon} size={30} color="black" />
    </TouchableNativeFeedback>
  );
};

export const HeaderButtonContainer: React.FC<ViewProps> = ({ children }) => {
  return (
    <View style={styles.headerButtonContainer}>{children}</View>
  );
}

const styles = StyleSheet.create({
  headerButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginRight: 10,
  },
  headerButton: {
    margin: 8,
  },
});