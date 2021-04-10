import React, { ReactNode } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { HeaderBackButton, StackHeaderLeftButtonProps, StackNavigationOptions } from "@react-navigation/stack";
import { useEffect } from "react";
import { BackHandler } from "react-native";

// Adds a custom back button for both the OS back button and on screen back button at once
export function useCustomBackButton(
  onBackPress: (() => boolean), // the function to run when the back button is pressed
  setOptions: (options: Partial<StackNavigationOptions>) => void): void {
  useFocusEffect( // Runs a function when the screen is put in focus
    () => {
      // adds a new function to run when the hardware back button is pressed
      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => // runs this function when the screen is put out of focus
        // removes the hardware event listener
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }
  );

  useEffect(() => { // Only runs when the screen is first loaded
    // creates a new back button component that replaces the old default one
    const newBackButton = (props: StackHeaderLeftButtonProps): ReactNode => {
      return (<HeaderBackButton {...props} onPress={onBackPress} />);
    };
    setOptions({ // seting the new back button
      headerLeft: newBackButton,
    });
  });
}