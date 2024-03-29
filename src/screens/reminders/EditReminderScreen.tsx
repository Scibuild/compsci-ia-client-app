import React from "react";
import { Button, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RemindersParamList } from "../../navigation/RemindersStackRoute";
import { BigText, KeyboardAvoidingScrollView } from "../../components/formatted";
import { FormattedTextInput } from "../../components/formatted";
import { RouteProp } from "@react-navigation/native";
import { ReminderTime, ReminderTimeFromString, ReminderTimeToString, useReminderStore } from "../../providers/RemindersStore";
import { useCustomBackButton } from '../../hooks/useBackButton';
import { TextInputList } from '../../components/TextInputList';
import { SpreadTimesModal } from "../../components/SpreadTimesModal";
import { timeRE } from "../../lib/regularExpressions";
import { TimeSelector } from "../../components/TimeSelector";


type EditRemindersScreenProp = {
  navigation: StackNavigationProp<RemindersParamList, 'Edit'>,
  route: RouteProp<RemindersParamList, 'Edit'>
}


export const EditReminderScreen: React.FC<EditRemindersScreenProp> = ({ navigation, route }) => {
  let id: string;
  if (route.params.id === undefined) {
    id = "";
  } else {
    id = route.params.id;
  }
  const reminder = useReminderStore(state => state.reminders.find(r => r.id === id))

  const [drug, setDrug] = React.useState<string>(reminder == null ? "" : reminder.drug);
  const [instructions, setInstructions] = React.useState<string>(reminder == null ? "" : reminder.instructions);
  const [times, setTimes] = React.useState<string[]>(() => reminder?.times == null ? [] : reminder.times.map(ReminderTimeToString));

  const [timeModalVisible, setTimeModalVisible] = React.useState(false)

  const replaceReminder = useReminderStore(state => state.replaceReminder)
  const addReminder = useReminderStore(state => state.addReminder)
  const deleteReminder = useReminderStore(state => state.deleteReminder)

  const [newTime, setNewTime] = React.useState(null);

  const onBackPress = () => {
    if (id == "") {
      navigation.goBack()
      return true;
    }
    let filledOut = true;
    // needs to be filled in
    filledOut &&= drug.trim() !== "";
    filledOut &&= instructions.trim() !== "";
    // all of the time need to match the timeRE regular expression
    filledOut &&= times.every(time => timeRE.test(time.trim()))
    // if not all the conditions are met, exit out
    if (!filledOut) { return true; }
    const newReminder = {
      drug,
      instructions,
      // repeatEveryDays: Number(repeatEveryDays),
      enabled: true,
      times: times.map(ReminderTimeFromString)
    };
    replaceReminder(id, newReminder);
    navigation.goBack()
    return true;
  };

  useCustomBackButton(onBackPress, navigation.setOptions)

  return (
    <KeyboardAvoidingScrollView>
      <BigText>Drug Name</BigText>
      <FormattedTextInput
        value={drug}
        onChangeText={setDrug}
        placeholder="Drug name"
        err={drug.trim() === ""}
      />
      <BigText>Instructions</BigText>
      <FormattedTextInput
        value={instructions}
        onChangeText={setInstructions}
        placeholder="Instructions"
        err={instructions.trim() === ""}
      />
      {/* <BigText>Repeat every how many days (0 for never)</BigText>
      <FormattedTextInput
        value={repeatEveryDays}
        onChangeText={(v) => setRepeatEveryDays(v.replace(/\D+/, ''))}
        placeholder="How many days"
        keyboardType="numeric"
        err={repeatEveryDays.trim() === ""}
      /> */}
      <BigText>Time (hh:mm)</BigText>

      <TextInputList
        value={times}
        onChangeText={setTimes}
        onChangeTextIndiv={(v) => v.replace(/[^0-9:]+/, '')}
        placeholder="12:00"
        err={(time) => time !== "" && !timeRE.test(time.trim())}
      />


      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <TimeSelector time={newTime} setTime={setNewTime} />
        <Button title="Generate Times" onPress={() => setTimeModalVisible(true)} />


        {id !== "" ? // whether this is a new one or editing
          <Button title="Delete" onPress={() => {
            navigation.goBack()
            deleteReminder(id)
          }} /> :
          <Button title="Add" onPress={() => {
            const newReminder = {
              drug,
              instructions,
              // repeatEveryDays: Number(repeatEveryDays),
              enabled: true,
              times: times.map(ReminderTimeFromString)
            };
            addReminder(newReminder);
            navigation.goBack()
          }} />
        }
      </View>
      <SpreadTimesModal
        visible={timeModalVisible}
        setVisible={setTimeModalVisible}
        setTimes={setTimes}
      />
    </KeyboardAvoidingScrollView>
  );
};

