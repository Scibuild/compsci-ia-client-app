import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ProfileProvider } from "../providers/ProfileProvider";
import { ViewRemindersScreen } from "../screens/reminders/ViewRemindersScreen";
import { EditReminderScreen } from "../screens/reminders/EditReminderScreen";

export type RemindersParamList = {
  View: undefined;
  Edit: { drug?: string, id?: string };
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
        <Stack.Screen
          name="Edit"
          component={EditReminderScreen}
          options={({ route }) => ({
            title: route.params.drug || "New Reminder"
          })}
        />
      </Stack.Navigator>
    </ProfileProvider>
  );
};

export default ReminderStackRoute;
