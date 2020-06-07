import React, { useState, useContext } from "react";
import { ScrollView, FlatList, TextInput } from "react-native-gesture-handler";
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

const TimePickerCP = ({ value, onChange }) => {
  const [show, setShow] = useState(false);
  if (Platform.OS == "android") {
    return (
      <>
        <Button title="Set Time" onPress={() => setShow(true)} />
        {show && (
          <DateTimePicker
            value={value}
            onChange={(e, t) => {
              setShow(false);
              onChange(e, t);
            }}
            mode="time"
            display="default"
          />
        )}
      </>
    );
  } else {
    return (
      <DateTimePicker
        value={value}
        onChange={onChange}
        mode="time"
        display="default"
      />
    );
  }
};

export const NewSideEffectScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [time, setTime] = useState(new Date());
  const [severity, setSeverity] = useState(5);

  const [errName, setErrName] = useState(false);

  const { addSideEffect } = useContext(SideEffectContext);

  return (
    <KeyboardAvoidingView
      contentContainerStyle={{ flex: 1 }}
      behavior="padding"
      enabled
      keyboardVerticalOffset={10}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          onChangeText={setName}
          value={name}
          placeholder="What is the side effect?"
          underlineColorAndroid={errName ? "red" : "teal"}
          style={styles.textInput}
        />
        {/* <TextInput
          onChangeText={setTime}
          value={time}
          placeholder="When was this"
          underlineColorAndroid={errTime ? "red" : "teal"}
          style={styles.textInput}
        /> */}
        <TimePickerCP
          value={time}
          onChange={(_, t) => {
            setTime(t || time);
          }}
        />
        <Text style={styles.text}>How bad is it?</Text>
        <Slider
          maximumValue={10}
          minimumValue={0}
          step={1}
          onSlidingComplete={(val) => setSeverity(val)}
          value={severity}
          style={styles.slider}
        />
        <Button
          title="Submit"
          onPress={() => {
            if (name && time && severity) {
              addSideEffect({
                name,
                instance: { time: time.getTime(), severity },
              });
              navigation.goBack();
            } else {
              setErrName(!name);
              // setErrTime(!time);
              // setErrSeverity(!severity);
            }
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  wrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  textInput: {
    margin: 10,
    padding: 5,
    fontSize: 20,
  },
  slider: {
    marginTop: 0,
    marginBottom: 20,
  },
  text: {
    margin: 10,
    marginBottom: 0,
    padding: 5,
    paddingBottom: 0,
    fontSize: 20,
  },
});
