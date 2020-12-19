import React from "react";
import { View } from "react-native";
import { FormattedTextInput, BigText } from "./formatted";
import { TextInputList } from "./TextInputList";

export const ProfileItemEdit = ({ name, value, onChangeText }) => {
  if (Array.isArray(value)) {
    // let paddedarray = value.concat([""]);
    return (
      <View>
        <BigText>{name}: </BigText>
        <TextInputList value={value} onChangeText={onChangeText} />
        {/* {paddedarray.map((val, i) => (
          <FormattedTextInput
            placeholder="New..."
            style={{ marginBottom: 0, marginTop: 0 }}
            key={i}
            value={val}
            onChangeText={newitem => {
              let newval = paddedarray
                .map((v, j) => (j === i ? newitem : v))
                .filter(v => v !== "");
              onChangeText(newval);
            }}
          />
        ))} */}
      </View>
    );
  }

  return (
    <View>
      <BigText>{name}: </BigText>
      <FormattedTextInput value={value} onChangeText={onChangeText} />
    </View>
  );
};
