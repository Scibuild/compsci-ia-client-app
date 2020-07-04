import React, { useState, useContext } from "react";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Slider,
  Platform,
} from "react-native";
import { Button } from "react-native";
import { SideEffectContext } from "../providers/SideEffectsProvider";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-community/picker";
import { FormattedTextInput } from "../components/formatted";

const DateTimePickerCP = ({ value, onChange }) => {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("time");

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
          is24hour={true}
        />
      )}
    </View>
  );
};

export const NewSideEffectScreen = ({ navigation }) => {
  const { state, addSideEffect } = useContext(SideEffectContext);

  const [name, setName] = useState(state[0].name);
  const [time, setTime] = useState(new Date());
  const [severity, setSeverity] = useState(5);
  const [sideEffect, setSideEffect] = useState(state[0].name);
  const other = "Other...";

  const [errName, setErrName] = useState(false);

  return (
    <KeyboardAvoidingView
      contentContainerStyle={styles.wrapper}
      behavior={Platform.OS === "ios" ? "height" : "padding"}
      enabled
      keyboardVerticalOffset={40}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Picker
          selectedValue={sideEffect}
          onValueChange={(itemValue) => {
            setSideEffect(itemValue);
            if (itemValue !== other) {
              setName(itemValue);
            } else {
              setName("");
            }
          }}
        >
          {state
            .map(({ name }) => name)
            .concat([other])
            .map((name) => (
              <Picker.Item label={name} key={name} value={name} />
            ))}
        </Picker>

        {sideEffect === other && (
          <FormattedTextInput
            onChangeText={setName}
            value={name}
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
          onSlidingComplete={(val) => setSeverity(val)}
          value={severity}
          style={styles.slider}
        />
        <View style={styles.submit}>
          <Button
            title="Submit"
            style={styles.submit}
            onPress={() => {
              if (name) {
                addSideEffect({
                  name,
                  instance: {
                    time: time.getTime(),
                    severity: Math.round(severity),
                  },
                });
                navigation.goBack();
              } else {
                setErrName(!name);
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
    paddingHorizontal: Platform.isPad ? 200 : 20,
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
    width: Platform.isPad ? 300 : "100%",
    alignSelf: "center",
    zIndex: 10,
  },
  submit: {
    alignItems: "center",
  },
});
