import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Switch } from "react-native-gesture-handler";
import { AddableListView } from '../../components/AddableListView';
import { BigText } from '../../components/formatted';
import { TouchableListItem } from '../../components/TouchableListItem';
import { RemindersParamList } from "../../navigation/RemindersStackRoute";
import * as Notifications from 'expo-notifications';
import { useReminderStore } from "../../providers/RemindersStore";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  })
})

// Notifications.scheduleNotificationAsync({
//   content: {
//     title: 'You pressed a switch',
//     body: `Its ${v} now`,
//     vibrate: [0, 100]
//   },
//   trigger: null
// })

type ViewRemindersScreenProp = { navigation: StackNavigationProp<RemindersParamList, 'View'> }
export const ViewRemindersScreen: React.FC<ViewRemindersScreenProp> = ({ navigation }) => {
  const toggleReminder = useReminderStore(state => state.toggleReminder);
  const addReminder = useReminderStore(state => state.addReminder);
  const reminders = useReminderStore(state => state.reminders)

  return (<AddableListView
    data={reminders}
    onAdd={() => {
      // addReminder({
      //   drug: 'generic pill',
      //   enabled: true,
      //   instructions: 'take',
      //   repeatEveryDays: 1,
      //   times: ['12:00']
      // })
      navigation.navigate("Edit", { drug: "" })
    }}
    renderItem={
      ({ item }) => (
        <TouchableListItem
          onPress={() => {
            navigation.navigate("Edit", { drug: item.drug, id: item.id })
          }}
        >
          <View style={styles.itemContainer}>
            <BigText>{item.drug}</BigText>
            <Switch value={item.enabled} onValueChange={() => {
              toggleReminder(item.id)
            }} />
          </View>
        </TouchableListItem>
      )
    }
  />);
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  }
})