import React from "react";
import {
  StyleSheet,
  Platform,
  Button,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RemindersParamList } from "../../navigation/RemindersStackRoute";
import { BigText, BoldText, KeyboardAvoidingScrollView } from "../../components/formatted";
import { FormattedTextInput } from "../../components/formatted";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { useReminderStore } from "../../providers/RemindersStore";
import { useCustomBackButton } from '../../hooks/useBackButton';


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

  const [drug, setDrug] = React.useState<string>(reminder === undefined ? "" : reminder.drug);
  //const [drugErr, setDrugErr] = React.useState<boolean>(false);
  const [instructions, setInstructions] = React.useState<string>(reminder === undefined ? "" : reminder.instructions);
  //const [instErr, setInstErr] = React.useState<boolean>(false);
  const [repeatEveryDays, setRepeatEveryDays] = React.useState<string>(reminder === undefined ? "" : reminder.repeatEveryDays.toString());
  //const [repErr, setRepErr] = React.useState<boolean>(false);
  const replaceReminder = useReminderStore(state => state.replaceReminder)
  const addReminder = useReminderStore(state => state.addReminder)
  const deleteReminder = useReminderStore(state => state.deleteReminder)


  let onBackPress = React.useCallback(() => {
    if (id == "") {
      navigation.goBack()
      return true;
    }
    let filledOut = true;
    filledOut &&= drug.trim() !== "";
    filledOut &&= instructions.trim() !== "";
    filledOut &&= repeatEveryDays.trim() !== "";
    if (!filledOut) { return true; }
    const newReminder = {
      drug,
      instructions,
      repeatEveryDays: Number(repeatEveryDays),
      enabled: true,
      times: []
    };
    replaceReminder(id, newReminder);
    navigation.goBack()
    return true;
  }, [instructions, drug, repeatEveryDays])

  useCustomBackButton(onBackPress, [instructions, drug, repeatEveryDays], navigation)

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
      <BigText>Repeat every how many days (0 for never)</BigText>
      <FormattedTextInput
        value={repeatEveryDays}
        onChangeText={(v) => setRepeatEveryDays(v.replace(/\D+/, ''))}
        placeholder="How many days"
        keyboardType="numeric"
        err={repeatEveryDays.trim() === ""}
      />
      {id !== "" ?
        <Button title="Delete" onPress={() => {
          navigation.goBack()
          deleteReminder(id)
        }} /> :
        <Button title="Add" onPress={() => {
          const newReminder = {
            drug,
            instructions,
            repeatEveryDays: Number(repeatEveryDays),
            enabled: true,
            times: []
          };
          addReminder(newReminder);
          navigation.goBack()
        }} />
      }
    </KeyboardAvoidingScrollView>
  );
};

const styles = StyleSheet.create({
  slider: {
    marginTop: 0,
    marginBottom: 20,

    alignSelf: "stretch",
  },
  text: {
    margin: 10,
    marginBottom: 0,
    padding: 5,
    paddingBottom: 0,
    fontSize: 20,
    alignSelf: "stretch",
  },
  datetimepicker: {
    width: Platform.isPad ? 300 : "100%",
    alignSelf: "center",
    zIndex: 10,
  },
  submit: {
    alignItems: "center",
  },
});
