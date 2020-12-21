import React from "react";
import { Text, StyleSheet } from "react-native";
import { AddableListView } from "../../components/AddableListView";
import { TouchableListItem } from "../../components/TouchableListItem";
import { useSideEffectStore } from '../../providers/SideEffectsStore';
import { StackNavigationProp } from '@react-navigation/stack';
import { SideEffectsParamList } from "../../navigation/SideEffectsStackRoute";


export interface SideEffectListItemProps {
  navigation: StackNavigationProp<SideEffectsParamList, "History">,
  name: string,
  id: string,
  index: number
}

export const SideEffectListItem: React.FC<SideEffectListItemProps> = ({ name, id, index, navigation }) => {
  return (
    <TouchableListItem
      onPress={() => {
        navigation.navigate("ViewSideEffect", { name, id, index });
      }}
    >
      <Text style={styles.listItemText}>{name}</Text>
    </TouchableListItem>
  );
};

const styles = StyleSheet.create({
  listItemTouchable: {
    padding: 15,
  },
  listItemText: {
    fontSize: 20,
  },
});

export interface SideEffectHistoryScreenProps {
  navigation: StackNavigationProp<SideEffectsParamList, "History">
}

export const SideEffectHistoryScreen: React.FC<SideEffectHistoryScreenProps> = ({ navigation }) => {
  const sideEffects = useSideEffectStore(s => s.sideEffects)

  return (
    <AddableListView
      data={sideEffects}
      renderItem={({ item, index }) => (
        <SideEffectListItem
          name={item.name}
          id={item.id}
          index={index}
          navigation={navigation}
        />
      )}
      onAdd={() => navigation.navigate("NewSideEffect")}
    />
  );
};
