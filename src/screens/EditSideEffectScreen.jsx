import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { ItemSeparator, Container } from "../components/formatted";
import { SideEffectContext } from "../providers/SideEffectsProvider";
import { FlatList } from "react-native-gesture-handler";

export const EditSideEffectScreen = ({ route, navigation }) => {
  const { state, deleteSideEffectById } = useContext(SideEffectContext);

  const instances = state[route.params.index]
    ? state[route.params.index].instances
    : null;

  return (
    <Container>
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

      <View style={styles.delete}>
        <Button
          title="Delete"
          onPress={() => {
            deleteSideEffectById(route.params.id);
            navigation.goBack();
          }}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  listItem: {
    fontSize: 20,
    padding: 5,
  },
  list: { flex: 1 },
  header: { flex: 0.1 },

  footer: { flex: 0.1 },
  delete: {
    alignSelf: "center",
  },
});
