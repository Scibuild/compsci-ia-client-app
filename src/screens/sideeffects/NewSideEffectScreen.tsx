import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Button
} from "react-native";
import Slider from '@react-native-community/slider';
import { useSideEffectStore } from "../../providers/SideEffectsStore";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-community/picker";
import { FormattedTextInput } from "../../components/formatted";
import { StackNavigationProp } from "@react-navigation/stack";
import { SideEffectsParamList } from "../../navigation/SideEffectsStackRoute";
import { useReminderStore } from "../../providers/RemindersStore";

interface DateTimePickerCPProps {
  value: Date,
  onChange: (e: Event, t: Date | undefined) => void
}

const DateTimePickerCP: React.FC<DateTimePickerCPProps> = ({ value, onChange }) => {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState<"time" | "date">("time");

  const ios = Platform.OS === "ios";
  const iosTimeButton = !ios || mode === "date";
  const iosDateButton = !ios || mode === "time";

  const buttonText = ios ? "Swap to " : "Set ";

  return (
    <View
      style={{
        flexDirection: ios ? "column" : "row",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      {iosTimeButton && (
        <Button
          title={buttonText + "Time"}
          onPress={() => {
            setMode("time");
            setShow(true);
          }}
        />
      )}
      {iosDateButton && (
        <Button
          title={buttonText + "Date"}
          onPress={() => {
            setMode("date");
            setShow(true);
          }}
        />
      )}
      {(ios || show) && (
        <DateTimePicker
          style={styles.datetimepicker}
          value={value}
          onChange={(e, t) => {
            setShow(false);
            onChange(e, t);
          }}
          mode={mode}
          display="default"
        // maximumDate={new Date(2300, 10, 20)}
        // is24hour={true}
        />
      )}
    </View>
  );
};

type NewSideEffectScreenProp = {
  navigation: StackNavigationProp<SideEffectsParamList, 'NewSideEffect'>,
}

export const NewSideEffectScreen: React.FC<NewSideEffectScreenProp> = ({ navigation }) => {
  const sideEffects = useSideEffectStore(s => s.sideEffects)
  const addSideEffect = useSideEffectStore(s => s.addSideEffect)

  const reminders = useReminderStore(s => s.reminders);
  const activeDrugs = reminders.filter(v => v.enabled).map(v => v.drug);

  const [time, setTime] = useState(new Date());
  const [severity, setSeverity] = useState(5);
  const [errName, setErrName] = useState(false);

  const [sideEffectIdx, setSideEffectIdx] = useState(() =>
    sideEffects.length === 0 ? -1 : 0,
  ); // default value if there are no side effects to 'other' == -1 
  // (only option as no side effects)
  // otherwise just default to first side effect in list
  const other = "Other..."; // String used in Picker for text box entry
  const [sideEffectName, setSideEffectName] = useState(() =>
    sideEffectIdx === -1 ? "" : sideEffects[sideEffectIdx].name,
  ); // The name of the selected side effect or blank if 'other' selected
  // If 'other' is selected then the blank will show in the text box
  // This variable will then be changed by the text box so it constantly
  // keeps track of the side effect selected whether 'other' or not

  return (
    <KeyboardAvoidingView
      contentContainerStyle={styles.wrapper}
      behavior={Platform.OS === "ios" ? "height" : "padding"}
      enabled
      keyboardVerticalOffset={40}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Picker
          selectedValue={sideEffectIdx}
          onValueChange={itemValue => {
            // need to convert to string from 'ReactText' then to number, 
            // can't jump straight to number
            const itemIdx = Number(itemValue.toString())
            // keep track of the item to show in the picker
            setSideEffectIdx(itemIdx);
            if (itemIdx !== -1) {
              // sets the name of the side effect to the selected one
              setSideEffectName(sideEffects[itemIdx].name);
            } else {
              // clears the name of the side effect for textbox entry
              setSideEffectName("");
            }
          }}
        >
          {sideEffects
            // map changes every element in the array by this function which
            // takes the name and the index of the side effect and stores them in a new object
            .map(({ name }, idx) => ({ name, idx }))
            // we appened a new object with the name 'Other...' and the always unique -1 index
            .concat([{ name: other, idx: -1 }])
            // returns a picker item with the label as the name and the value (internal) as the index
            .map(({ name, idx }) => (
              <Picker.Item label={name} key={idx} value={idx} />
            ))}
        </Picker>


        {sideEffectIdx === -1 && ( // only show the text box if 'other' (-1) is selected
          // in javascript, the && operator returns the right hand side (textbox) 
          // if the left is true (other selected)
          <FormattedTextInput
            onChangeText={setSideEffectName}
            value={sideEffectName}
            placeholder="What is the side effect?"
            err={errName}
          />
        )}

        <DateTimePickerCP
          value={time}
          onChange={(_, t) => {
            setTime(t || time);
          }}
        />
        <Text style={styles.text}>How bad is it?</Text>
        <Slider
          maximumValue={10}
          minimumValue={0}
          step={Platform.OS === "ios" ? 0 : 1}
          onSlidingComplete={val => setSeverity(val)}
          value={severity}
          style={styles.slider}
        />
        <View style={styles.submit}>
          <Button
            title="Submit"
            // style={styles.submit}
            onPress={() => {
              if (sideEffectName) {
                addSideEffect(sideEffectName,
                  {
                    time: time.getTime(),
                    severity: severity,
                    currentMedication: activeDrugs
                  });
                navigation.goBack();
              } else {
                setErrName(!sideEffectName);
              }
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
    // height: "100%",
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
    width: "100%",
    alignSelf: "center",
    zIndex: 10,
  },
  submit: {
    alignItems: "center",
  },
});
