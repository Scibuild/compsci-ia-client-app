import React from "react";
import { ProfileStoreState, useProfileStore } from "../../providers/ProfileStore";
import { FlatList } from "react-native-gesture-handler";
import { ProfileItemView } from "../../components/ProfileItemView";
import { StyleSheet } from "react-native";

const profileSelector = (s: ProfileStoreState) => s.profile;

export const ViewProfileScreen: React.FC<{}> = () => {
  const profile = useProfileStore(profileSelector);
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

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
