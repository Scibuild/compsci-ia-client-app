import React from "react";
import { View, Text, StyleSheet, Slider, Alert } from "react-native";
import { ItemSeparator, BigText, BoldText } from "../../components/formatted";
import { SideEffectInstance, useSideEffectStore } from "../../providers/SideEffectsStore";
import { FlatList, RectButton } from "react-native-gesture-handler";
import { SideEffectsParamList } from "../../navigation/SideEffectsStackRoute";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { formatDate } from "../../lib/formatdate";
import { HeaderButton, HeaderButtonContainer } from "../../components/HeaderButton";
import { useCustomBackButton } from '../../hooks/useBackButton';
import { TouchableListItem } from "../../components/TouchableListItem";
import { AntDesign } from '@expo/vector-icons';

export interface ViewSideEffectScreenProps {
  navigation: StackNavigationProp<SideEffectsParamList, "ViewSideEffect">,
  route: RouteProp<SideEffectsParamList, "ViewSideEffect">
}

export const ViewSideEffectScreen: React.FC<ViewSideEffectScreenProps> = ({ route, navigation }) => {
  const [editMode, setEditMode] = React.useState(false);

  const sideEffects = useSideEffectStore(s => s.sideEffects)
  const deleteSideEffectById = useSideEffectStore(s => s.deleteSideEffectById)
  const deleteSideEffectInstance = useSideEffectStore(s => s.deleteSideEffectInstance)
  const editSideEffectInstance = useSideEffectStore(s => s.editSideEffectInstance)


  React.useLayoutEffect(React.useCallback(() => {
    navigation.setOptions({
      headerRight: viewHeaderRight(() => {
        confirmDeleteAlert(route.params.name, () => deleteSideEffectById(route.params.id))
      },
        () => {
          setEditMode(true)
        }, editMode)
    })
  }, [editMode]), [editMode])

  const onBackPress = React.useCallback(() => {
    if (editMode) {
      setEditMode(false);
    } else {
      navigation.goBack();
    }
    return true;
  }, [editMode]);
  useCustomBackButton(onBackPress, [editMode], navigation.setOptions);



  const sideEffectSelected = sideEffects[route.params.index];
  if (sideEffectSelected === undefined) { navigation.navigate("History"); return <></> } // if deleted dont crash
  const instances = sideEffectSelected.instances

  return (
    <FlatList
      data={instances}
      renderItem={({ item, index }) => (
        <InstanceItem
          instance={item}
          index={index}
          editSideEffectInstance={editSideEffectInstance}
          deleteSideEffectInstance={deleteSideEffectInstance}
          editMode={editMode}
          sideeffectid={sideEffectSelected?.id ?? ""}
        />
      )}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(_, index) => index.toString()}
    // ListHeaderComponent={
    // }
    // ListFooterComponent={() => (
    // )}
    // contentContainerStyle={styles.container}
    // style={styles.list}
    // ListFooterComponentStyle={styles.footer}
    // ListHeaderComponentStyle={styles.header}
    />

  );
  /* <View style={styles.delete}>
        <Button
          title="Delete"
          onPress={() => {
            deleteSideEffectById(route.params.id);
            navigation.navigate("History")
          }}
        />
      </View> */
};

interface InstanceItemProps {
  instance: SideEffectInstance,
  index: number,
  editSideEffectInstance: (id: string, instanceid: string, newInstance: Partial<SideEffectInstance>) => void,
  deleteSideEffectInstance: (id: string, instanceid: string) => void,
  editMode: boolean,
  sideeffectid: string
}

const InstanceItem: React.FC<InstanceItemProps> = ({ instance, editSideEffectInstance, deleteSideEffectInstance, editMode, sideeffectid }) => {
  const [showDetails, setShowDetails] = React.useState(false);
  const [tempSeverity, setTempSeverity] = React.useState(instance.severity);

  return (
    <TouchableListItem
      onPress={() => {
        if (!editMode) {
          setShowDetails(!showDetails)
        }
      }}
      enabled={!editMode}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 3 }} >
        <RectButton enabled={editMode} style={{ padding: 5 }}>
          <BigText>
            {formatDate(new Date(instance.time))}
          </BigText>
        </RectButton>
        <BigText style={{ padding: 5 }} > <BoldText>
          {tempSeverity}
        </BoldText> </BigText>
      </View>
      {showDetails && !editMode &&
        <View>
          <BoldText>
            Active medication:
        </BoldText>

          {instance.currentMedication?.map((v, i) => (
            <Text key={i}> {`\t\t\t\u2022\t${v}\n`}</Text>
          ))}
        </View>}
      {editMode &&
        <>
          <View>

            <Slider
              maximumValue={10}
              minimumValue={0}
              step={1}
              onSlidingComplete={val => editSideEffectInstance(sideeffectid ?? "", instance.id ?? "", { severity: val })}
              onValueChange={val => setTempSeverity(val)}
              value={tempSeverity}
              style={styles.slider}
            />
          </View>

          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <RectButton style={{ padding: 10 }} onPress={() => deleteSideEffectInstance(sideeffectid, instance.id ?? "")}>
              <AntDesign name="delete" size={20} />
            </RectButton>
          </View>
        </>
      }

    </TouchableListItem>
  )
}


const viewHeaderRight = (deleteSideEffect: () => void, onEditPress: () => void, editMode: boolean) => () => {
  return (
    <HeaderButtonContainer>
      {editMode ?
        <HeaderButton onPress={deleteSideEffect} icon="delete" />
        : <HeaderButton onPress={onEditPress} icon="edit" />
      }
    </HeaderButtonContainer>
  );
};


export const confirmDeleteAlert = (sideEffectName: string, deleteSideEffect: () => void): boolean => {
  Alert.alert("Delete", "Are you sure you want to delete " + sideEffectName + "?", [
    { text: "Cancel", onPress: () => { return; } },
    { text: "Confirm", onPress: deleteSideEffect },
  ]);
  return true;
};

const styles = StyleSheet.create({

  slider: {
    marginTop: 10,
    marginBottom: 5,

    alignSelf: "stretch",
  },
});

