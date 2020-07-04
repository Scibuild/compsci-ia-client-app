import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SideEffectsStackRoute from "./SideEffectsStackRoute";
import ProfileStackRoute from "./ProfileStackRoute";
import { AntDesign } from "@expo/vector-icons";
import { Text } from "react-native";

const Tabs = createBottomTabNavigator();

const tabBarIcon = (route) => ({ focused, color, size }) => {
  let iconName;
  if (route.name === "SideEffects") {
    iconName = focused ? "frown" : "frowno";
  } else if (route.name === "Profile") {
    iconName = "user";
  }

  return <AntDesign name={iconName} color={color} size={size} />;
};

const MainTabs = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: tabBarIcon(route),
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "grey",
      }}
    >
      <Tabs.Screen name="SideEffects" component={SideEffectsStackRoute} />
      <Tabs.Screen name="Profile" component={ProfileStackRoute} />
    </Tabs.Navigator>
  );
};

export default MainTabs;
