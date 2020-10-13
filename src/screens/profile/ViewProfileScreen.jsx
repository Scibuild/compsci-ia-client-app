import React, { useContext } from "react";
import { ProfileContext } from "../../providers/ProfileProvider";
import { FlatList } from "react-native-gesture-handler";
import { ProfileItemView } from "../../components/ProfileItemView";
import { StyleSheet } from "react-native";

export const ViewProfileScreen = () => {
  let { profile } = useContext(ProfileContext);
  return (
    <FlatList
      data={profile}
      renderItem={({ item }) => {
        return (
          <ProfileItemView name={item.name} key={item.id} value={item.value} />
        );
      }}
      contentContainerStyle={styles.container}
    />
  );
};

let styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
