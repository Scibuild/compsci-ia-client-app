import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ProfileProvider } from "../providers/ProfileProvider";
import { ViewRemindersScreen } from "../screens/reminders/ViewRemindersScreen";

export type RemindersParamList = {
  View: undefined;
}

const Stack = createStackNavigator<RemindersParamList>();

const ReminderStackRoute = () => {
  return (
    <ProfileProvider>
      <Stack.Navigator initialRouteName="View">
        <Stack.Screen
          name="View"
          component={ViewRemindersScreen}
          options={() => ({
            title: "Reminders",
          })}
        />
      </Stack.Navigator>
    </ProfileProvider>
  );
};

export default ReminderStackRoute;
