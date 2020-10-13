import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ProfileProvider } from "../providers/ProfileProvider";
import { ViewRemindersScreen } from "../screens/reminders/ViewRemindersScreen";

const Stack = createStackNavigator();

const ReminderStackRoute = () => {
  return (
    <ProfileProvider>
      <Stack.Navigator initialRouteName="History">
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
