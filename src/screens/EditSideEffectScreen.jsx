import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Center, ItemSeparator } from "../components/formatted";
import { SideEffectContext } from "../providers/SideEffectsProvider";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import { AddButton } from "../components/AddButton";
import { SideEffectListItem } from "./SideEffectHistoryScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export const EditSideEffectScreen = ({ route, navigation }) => {
  const { state, deleteSideEffectById } = useContext(SideEffectContext);

  const instances = state[route.params.index]
    ? state[route.params.index].instances
    : null;

  return (
    <View style={styles.container}>
      <Text style={styles.listItem}>Side effect: {route.params.name}</Text>
      <FlatList
        data={instances}
        renderItem={({ item }) => (
          <Text style={styles.listItem}>
            {new Date(item.time).toLocaleString()}: {item.severity}
          </Text>
        )}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(_, index) => index.toString()}
        // ListHeaderComponent={
        // }
        // ListFooterComponent={() => (
        // )}
        contentContainerStyle={styles.container}
        style={styles.list}
        ListFooterComponentStyle={styles.footer}
        ListHeaderComponentStyle={styles.header}
      />

      <Button
        title="Delete"
        onPress={() => {
          deleteSideEffectById(route.params.id);
          navigation.goBack();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

    justifyContent: "center",
  },
  listItem: {
    fontSize: 20,
    padding: 5,
  },
  list: { flex: 1 },
  header: { flex: 0.1 },

  footer: { flex: 0.1 },
});
