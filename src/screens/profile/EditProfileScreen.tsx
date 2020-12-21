import React, { useCallback, useLayoutEffect } from "react";
import { ProfileItemEdit } from "../../components/ProfileItemEdit";
import { KeyboardAvoidingScrollView } from "../../components/formatted";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";
import { useCustomBackButton } from "../../hooks/useBackButton";
import { ProfileParamsList } from "../../navigation/ProfileStackRoute";
import { ProfileStoreState, useProfileStore } from '../../providers/ProfileStore';


interface EditProfileScreenProps {
  navigation: StackNavigationProp<ProfileParamsList, "EditProfile">
}

const profileSelector = (s: ProfileStoreState) => s.profile;
const temporaryProfileSelector = (s: ProfileStoreState) => s.temporaryProfile;
const dropProfileChangesSelector = (s: ProfileStoreState) => s.dropProfileChanges;
const commitProfileChangesSelector = (s: ProfileStoreState) => s.commitProfileChanges;
const setFieldSelector = (s: ProfileStoreState) => s.setField;

export const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ navigation }) => {
  const profile = useProfileStore(profileSelector);
  const temporaryProfile = useProfileStore(temporaryProfileSelector);
  const dropProfileChanges = useProfileStore(dropProfileChangesSelector);
  const commitProfileChanges = useProfileStore(commitProfileChangesSelector);
  const setField = useProfileStore(setFieldSelector);

  React.useEffect(() => {
    return dropProfileChanges; // drop changes on unload
  }, []);

  const onBackPress = useCallback(() => {
    const saved = temporaryProfile.length === 0;
    if (!saved) {
      unsavedAlert(navigation);
    } else {
      navigation.goBack();
    }
    return true;
  }, [temporaryProfile.length]);

  useCustomBackButton(onBackPress, [temporaryProfile.length], navigation.setOptions);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        saveButton(() => {
          commitProfileChanges();
          navigation.goBack();
        }),
    });
  }, []);

  const profileToRender = temporaryProfile.length === 0 ? profile : temporaryProfile;
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

export const unsavedAlert = (navigation: StackNavigationProp<ProfileParamsList, "EditProfile">): boolean => {
  Alert.alert("Unsaved Changes", "Are you sure you want to leave?", [
    { text: "Cancel", onPress: () => { return; } },
    { text: "Leave", onPress: navigation.goBack },
  ]);
  return true;
};

const saveButton = (commitProfileChanges: () => void) => (
  <TouchableNativeFeedback
    style={{ margin: 8, marginRight: 18 }}
    onPress={commitProfileChanges}
  >
    <AntDesign name="save" size={30} color="black" />
  </TouchableNativeFeedback>
);
