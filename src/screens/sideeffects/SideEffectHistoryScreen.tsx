import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { AddableListView } from "../../components/AddableListView";
import { TouchableListItem } from "../../components/TouchableListItem";
import { useSideEffectStore } from '../../providers/SideEffectsStore';
import { StackNavigationProp } from '@react-navigation/stack';
import { SideEffectsParamList } from "../../navigation/SideEffectsStackRoute";
import { Entypo } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import Menu, { MenuItem } from 'react-native-material-menu';
import { confirmDeleteAlert } from "./ViewSideEffectScreen";
import { ChangeSideEffectNameModal } from '../../components/ChangeSideEffectNameModal';
import { BigText } from "../../components/formatted";

export interface SideEffectListItemProps {
  navigation: StackNavigationProp<SideEffectsParamList, "History">,
  name: string,
  id: string,
  index: number,
  deleteSideEffect: (id: string) => void,
  editSideEffectName: (id: string, newName: string) => void,
}

export const SideEffectListItem: React.FC<SideEffectListItemProps> = ({ name, id, index, navigation, deleteSideEffect, editSideEffectName }) => {
  // need to add in 3 dots which let you either delete or edit name with a popup menu from react-native-popup-menu

  const menuRef = React.useRef<Menu | null>(null);
  const [changeNameVisible, setChangeNameVisible] = React.useState(false);
  return (
    <>
      <TouchableListItem
        onPress={() => {
          navigation.navigate("ViewSideEffect", { name, id, index });
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <BigText>{name}</BigText>
          <Menu
            ref={r => menuRef.current = r}
            button={
              <RectButton style={{ padding: 3 }} onPress={() => { menuRef.current?.show(); }}>
                <Entypo name="dots-three-vertical" size={20} color="#555" />
              </RectButton>
            }
          >
            <MenuItem onPress={() => {
              setChangeNameVisible(true)
              menuRef.current?.hide()
            }}>Change Name</MenuItem>
            <MenuItem onPress={() => {
              confirmDeleteAlert(name, () => deleteSideEffect(id))
              menuRef.current?.hide()
            }}>Delete</MenuItem>
          </Menu>
        </View>
      </TouchableListItem >
      <ChangeSideEffectNameModal
        setVisible={setChangeNameVisible}
        visible={changeNameVisible}
        editSideEffectName={editSideEffectName}
        sideEffectId={id}
        sideEffectName={name}
      />
    </>
  );
};

export interface SideEffectHistoryScreenProps {
  navigation: StackNavigationProp<SideEffectsParamList, "History">
}

export const SideEffectHistoryScreen: React.FC<SideEffectHistoryScreenProps> = ({ navigation }) => {
  const sideEffects = useSideEffectStore(s => s.sideEffects)
  const deleteSideEffect = useSideEffectStore(s => s.deleteSideEffectById)
  const editSideEffectName = useSideEffectStore(s => s.editSideEffectName)

  return (
    <AddableListView
      data={sideEffects}
      renderItem={({ item, index }) => (
        <SideEffectListItem
          name={item.name}
          id={item.id}
          index={index}
          navigation={navigation}
          deleteSideEffect={deleteSideEffect}
          editSideEffectName={editSideEffectName}
        />
      )}
      onAdd={() => navigation.navigate("NewSideEffect")}
    />
  );
};

