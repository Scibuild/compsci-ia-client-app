import React, { ReactNode } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { HeaderBackButton, StackHeaderLeftButtonProps, StackNavigationOptions } from "@react-navigation/stack";
import { DependencyList, useCallback, useLayoutEffect } from "react";
import { BackHandler } from "react-native";


export function useCustomBackButton(
  onBackPress: (() => boolean),
  updateDependency: DependencyList,
  setOptions: (options: Partial<StackNavigationOptions>) => void): void {
  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, updateDependency),
  );

  useLayoutEffect(() => {
    const newBackButton = (props: StackHeaderLeftButtonProps): ReactNode => {
      return (<HeaderBackButton {...props} onPress={onBackPress} />);
    };
    setOptions({
      headerLeft: newBackButton,
    });
  }, updateDependency);
}