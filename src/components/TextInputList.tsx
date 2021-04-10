import React from "react";
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
  // default arguments
  value = [], // the list of strings of the values for each text box
  onChangeText = () => { return; }, // if any input is changed
  onChangeTextIndiv = v => v, // if one of the inputs changes run this on that input
  placeholder = "New...",
  err = () => false, // run to check if textbox should have red underline
  keyboardType = "default",
  style = {}
}) => {

  // append an empty string to the current values for the extra input box with 'New...' in it
  const paddedarray = value.concat([""]);
  return (
    <>{ // the empty tags '<> </>' group several tags together into a single tag
      // so that it can be returned from the function
      paddedarray.map((val, i) => ( // run this over every element in the array
        <FormattedTextInput
          placeholder={placeholder}
          style={{ marginBottom: 0, marginTop: 0, ...style }}
          key={i}
          value={val}
          err={err(val)}
          keyboardType={keyboardType}
          onChangeText={newitem => {
            const newval = paddedarray
              // where j != i (the position in the array does not equal the text box index)
              // the item in the array is not changed, but if they are then it is updated
              // this is like an immutable version of: array[i] = newitem
              .map((v, j) => (j === i ? onChangeTextIndiv(newitem) : v))
              // removes any empty items so if the text box was emptied by user it is deleted
              .filter(v => v !== "");
            // assign the new array to the stateful array of values
            onChangeText(newval);
          }}
        />
      ))
    }</>
  );
}