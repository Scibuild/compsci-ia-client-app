import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { ProfileItemView } from "../components/ProfileItemView";
import { StyleSheet } from "react-native";

export const ViewProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <ProfileItemView name="Name" value="Theo MB" style={styles.text} />
      <ProfileItemView
        name="Previous Scans"
        style={styles.text}
        value={["X-ray", "CAT", "EEG", "MRI"]}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  text: {
    fontSize: 20,
  },
});
