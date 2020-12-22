import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { ItemSeparator, Container } from "../../components/formatted";
import { useSideEffectStore } from "../../providers/SideEffectsStore";
import { FlatList } from "react-native-gesture-handler";
import { SideEffectsParamList } from "../../navigation/SideEffectsStackRoute";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export interface ViewSideEffectScreenProps {
  navigation: StackNavigationProp<SideEffectsParamList, "ViewSideEffect">,
  route: RouteProp<SideEffectsParamList, "ViewSideEffect">
}

export const ViewSideEffectScreen: React.FC<ViewSideEffectScreenProps> = ({ route, navigation }) => {
  const sideEffects = useSideEffectStore(s => s.sideEffects)
  const deleteSideEffectById = useSideEffectStore(s => s.deleteSideEffectById)

  if (sideEffects[route.params.index] === undefined) { navigation.navigate("History"); return <></> }
  const instances = sideEffects[route.params.index].instances

  return (
    <Container>
      {/* <Text style={styles.listItem}>Side effect: {route.params.name}</Text> */}
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

      {/* <View style={styles.delete}>
        <Button
          title="Delete"
          onPress={() => {
            deleteSideEffectById(route.params.id);
            navigation.navigate("History")
          }}
        />
      </View> */}
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
