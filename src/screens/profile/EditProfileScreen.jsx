import React, { useCallback, useLayoutEffect } from "react";
import { ProfileItemEdit } from "../../components/ProfileItemEdit";
import {
  KeyboardAvoidingScrollView,
  ScrollContainer,
} from "../../components/formatted";
import { ProfileContext } from "../../providers/ProfileProvider";
import { useFocusEffect } from "@react-navigation/native";
import { BackHandler } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { Alert } from "react-native";
import { HeaderBackButton } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";
import { useCustomBackButton } from "../../hooks/useBackButton";

export const EditProfileScreen = ({ navigation }) => {
  let {
    profile,
    tempProfile,
    dropProfileChanges,
    commitProfileChanges,
    setField,
  } = React.useContext(ProfileContext);

  React.useEffect(() => {
    return dropProfileChanges;
  }, []);

  let onBackPress = useCallback(() => {
    let saved = tempProfile.length === 0;
    if (!saved) {
      unsavedAlert(navigation);
    } else {
      navigation.goBack();
    }
    return true;
  }, [tempProfile.length]);

  useCustomBackButton(onBackPress, [tempProfile.length], navigation);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        saveButton(() => {
          commitProfileChanges();
          navigation.goBack();
        }),
    });
  }, []);

  let profileToRender = tempProfile.length === 0 ? profile : tempProfile;
  return (
    <KeyboardAvoidingScrollView>
      {profileToRender.map(({ name, id, value }) => (
        <ProfileItemEdit
          name={name}
          key={id}
          value={value}
          onChangeText={setField(id)}
        />
      ))}
      {/* <Button title="State broken" onPress={rebuildState} /> */}
    </KeyboardAvoidingScrollView>
  );
};

export const unsavedAlert = navigation => {
  Alert.alert("Unsaved Changes", "Are you sure you want to leave?", [
    { text: "Cancel", onPress: () => {} },
    { text: "Leave", onPress: navigation.goBack },
  ]);
  return true;
};

const saveButton = commitProfileChanges => (
  <TouchableNativeFeedback
    style={{ margin: 8, marginRight: 18 }}
    onPress={commitProfileChanges}
  >
    <AntDesign name="save" size={30} color="black" />
  </TouchableNativeFeedback>
);
