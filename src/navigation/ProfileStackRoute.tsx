import React from "react";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { ViewProfileScreen } from "../screens/profile/ViewProfileScreen";
import { EditProfileScreen } from "../screens/profile/EditProfileScreen";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useProfileStore, ProfileStoreState, ProfileItem } from "../providers/ProfileStore";
import { generatePDF } from "../lib/generatepdf";
import { HeaderButton, HeaderButtonContainer } from "../components/HeaderButton";

export type ProfileParamsList = {
  View: undefined;
  EditProfile: undefined;
}

const Stack = createStackNavigator<ProfileParamsList>();

const profileSelector = (s: ProfileStoreState) => s.profile;

const ProfileStackRoute: React.FC<{}> = () => {
  const profile = useProfileStore(profileSelector)
  return (
    <Stack.Navigator initialRouteName="View">
      <Stack.Screen
        name="View"
        component={ViewProfileScreen}
        options={({ navigation }) => ({
          title: "Profile",
          headerRight: viewHeaderRight(navigation, profile),
        })}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={() => ({
          title: "Edit Profile",
        })}
      />
    </Stack.Navigator>
  );
};

const viewHeaderRight = (navigation: StackNavigationProp<ProfileParamsList, "View">, profile: ProfileItem[]) => () => {
  return (
    <HeaderButtonContainer>
      <HeaderButton
        onPress={() => navigation.navigate("EditProfile")}
        icon="edit"
      />
      <HeaderButton
        onPress={() => generatePDF(profile)}
        icon="export"
      />
    </HeaderButtonContainer>
  );
};

const styles = StyleSheet.create({
  headerButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginRight: 10,
  },
  headerButton: {
    margin: 8,
  },
});

export default ProfileStackRoute;
