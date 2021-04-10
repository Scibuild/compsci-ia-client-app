import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SideEffectsStackRoute from "./SideEffectsStackRoute";
import ProfileStackRoute from "./ProfileStackRoute";
import { AntDesign } from "@expo/vector-icons";
import { Platform } from "react-native";
import ReminderStackRoute from "./RemindersStackRoute";
import { RouteProp } from '@react-navigation/native';

type TabsParamsList = {
  SideEffects: undefined;
  Profile: undefined;
  Reminders: undefined;
}

const Tabs = createBottomTabNavigator<TabsParamsList>();

type TabBarIconProps = { focused: boolean, color: string, size: number };
const tabBarIcon = (route: RouteProp<TabsParamsList, any>): React.FC<TabBarIconProps> => ({ focused, color, size }) => {
  let iconName = "";
  if (route.name === "SideEffects") {
    iconName = focused ? "frown" : "frowno";
  } else if (route.name === "Profile") {
    iconName = "user";
  } else if (route.name === "Reminders") {
    iconName = focused ? "clockcircle" : "clockcircleo";
  }

  return <AntDesign name={iconName} color={color} size={size} />;
};

const MainTabs: React.FC<{}> = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: tabBarIcon(route),
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "grey",
        keyboardHidesTabBar: Platform.OS == "ios" ? false : true,
      }}
    >
      <Tabs.Screen name="Reminders" component={ReminderStackRoute} />
      <Tabs.Screen name="SideEffects" component={SideEffectsStackRoute} />
      <Tabs.Screen name="Profile" component={ProfileStackRoute} />
    </Tabs.Navigator>
  );
};

export default MainTabs;
