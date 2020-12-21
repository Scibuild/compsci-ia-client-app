import React from "react";
import { View } from "react-native";
import { BigText, BoldText } from "./formatted";

interface ProfileItemViewProps {
  name: string,
  value: string | string[],
}
export const ProfileItemView: React.FC<ProfileItemViewProps> = ({ name, value }) => {
  if (Array.isArray(value)) {
    return (
      <View>
        <BigText>
          {name}:
          {value.map((v, i) => (
            <BoldText key={i}>{`\n\t\t\t\u2022\t${v}`}</BoldText>
          ))}
        </BigText>
      </View>
    );
  }

  return (
    <View>
      <BigText>
        {name}: <BoldText>{value}</BoldText>
      </BigText>
    </View>
  );
};
