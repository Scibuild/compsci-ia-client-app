import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Switch } from "react-native-gesture-handler";
import { AddableListView } from '../../components/AddableListView';
import { BigText } from '../../components/formatted';
import { TouchableListItem } from '../../components/TouchableListItem';
import { RemindersParamList } from "../../navigation/RemindersStackRoute";
import { useReminderStore } from "../../providers/RemindersStore";
import { produce } from 'immer';
import { EditReminderScreen } from './EditReminderScreen';


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

  // prevents the a visual glitch caused by the asyncronous enabling of notifications by setting the visual state temporarily here
  const [tempToggle, setTempToggle] = useState<Map<String, boolean>>(new Map())

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
            <Switch value={tempToggle.get(item.id) || item.enabled} onValueChange={() => {
              setTempToggle(produce(tempToggle, s => { s.set(item.id, !item.enabled) }))
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