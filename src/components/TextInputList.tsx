import React from "react";
import { View } from "react-native";
import { FormattedTextInput } from "./formatted";

interface TextInputListProps {
    onChangeText?: (text: string[]) => void,
    onChangeTextIndiv?: (text: string) => string,
    value?: string[],
    placeholder?: string,
    err?: (text: string) => boolean,
    style?: any,
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad" | "number-pad" | "decimal-pad" | "visible-password" | "ascii-capable" | "numbers-and-punctuation" | "url" | "name-phone-pad" | "twitter" | "web-search"
}

export const TextInputList: React.FC<TextInputListProps> = ({
    value = [],
    onChangeText = () => { },
    onChangeTextIndiv = v => v,
    placeholder = "New...",
    err = () => false,
    keyboardType = "default",
    style = {}
}) => {

    let paddedarray = value.concat([""]);
    return (
        <>{
            paddedarray.map((val, i) => (
                <FormattedTextInput
                    placeholder={placeholder}
                    style={{ marginBottom: 0, marginTop: 0, ...style }}
                    key={i}
                    value={val}
                    err={err(val)}
                    keyboardType={keyboardType}
                    onChangeText={newitem => {
                        let newval = paddedarray
                            .map((v, j) => (j === i ? onChangeTextIndiv(newitem) : v))
                            .filter(v => v !== "");
                        onChangeText(newval);
                    }}
                />
            ))
        }</>
    );
}