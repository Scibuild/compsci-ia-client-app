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
const startProfileChangesSelector = (s: ProfileStoreState) => s.startProfileChanges;
const dropProfileChangesSelector = (s: ProfileStoreState) => s.dropProfileChanges;
const commitProfileChangesSelector = (s: ProfileStoreState) => s.commitProfileChanges;
const setFieldSelector = (s: ProfileStoreState) => s.setField;

export const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ navigation }) => {
  const profile = useProfileStore(profileSelector);
  const temporaryProfile = useProfileStore(temporaryProfileSelector);
  const startProfileChanges = useProfileStore(startProfileChangesSelector);
  const dropProfileChanges = useProfileStore(dropProfileChangesSelector);
  const commitProfileChanges = useProfileStore(commitProfileChangesSelector);
  const setField = useProfileStore(setFieldSelector);

  React.useEffect(() => {
    return dropProfileChanges; // leave edit mode if leave screen and changes not saved
  }, []);

  const onBackPress = useCallback(() => {
    const saved = temporaryProfile.length === 0; // whether in edit mode
    if (!saved) {
      // if it isn't saved, don't let the user leave if they don't want to
      unsavedAlert(navigation);
    } else {
      navigation.goBack();
    }
    return true;
  }, [temporaryProfile.length]); // rebuild function if edit mode changes (is saved)

  useCustomBackButton(onBackPress, navigation.setOptions);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        saveButton(() => {
          commitProfileChanges();
          navigation.goBack();
        }),
    });
  }, []);

  // render either the profile or temp profile depending on whether we are in edit mode
  const profileToRender = temporaryProfile.length === 0 ? profile : temporaryProfile;
  return (
    <KeyboardAvoidingScrollView>
      { // create a text box or text box list for every field in the profile
        profileToRender.map(({ name, id, value }) => (
          <ProfileItemEdit
            name={name}
            key={id}
            value={value}
            onChangeText={setField(id) /* returns a function to set the field for this text box*/}
            onChangeAnyText={startProfileChanges /* if any text box is changed make sure to automatically go into edit mode */}
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
