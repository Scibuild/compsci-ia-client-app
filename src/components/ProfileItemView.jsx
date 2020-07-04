import React from "react";
import { View, Text } from "react-native";

export const ProfileItemView = ({ name, value, style }) => {
  if (Array.isArray(value)) {
    return (
      <View>
        <Text style={style}>{name}:</Text>
        {value.map((v, i) => (
          <Text style={style} key={i}>{`\t\u2022\t${v}`}</Text>
        ))}
      </View>
    );
  }

  return (
    <View>
      <Text style={style}>
        {name}: {value}
      </Text>
    </View>
  );
};
