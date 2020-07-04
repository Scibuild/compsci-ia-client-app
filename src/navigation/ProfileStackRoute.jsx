import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ViewProfileScreen } from "../screens/ViewProfileScreen";
import { EditProfileScreen } from "../screens/EditProfileScreen";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const Stack = createStackNavigator();

const ProfileStackRoute = () => {
  return (
    <Stack.Navigator initialRouteName="History">
      <Stack.Screen
        name="View"
        component={ViewProfileScreen}
        options={({ navigation }) => ({
          title: "Profile",
          headerRight: viewHeaderRight(navigation),
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

const viewHeaderRight = (navigation) => () => {
  return (
    <View style={styles.headerButtonContainer}>
      <TouchableNativeFeedback
        onPress={() => navigation.navigate("EditProfile")}
        style={styles.headerButton}
      >
        <AntDesign name="edit" size={30} color="black" />
      </TouchableNativeFeedback>
      <TouchableNativeFeedback style={styles.headerButton}>
        <AntDesign name="export" size={30} color="black" />
      </TouchableNativeFeedback>
    </View>
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