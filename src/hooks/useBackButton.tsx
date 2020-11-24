import React from 'react';
import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/stack";
import { DependencyList, useCallback, useLayoutEffect } from "react";
import { BackHandler, ButtonProps } from "react-native";


export function useCustomBackButton(onBackPress: (() => boolean), updateDependency: DependencyList, navigation: NavigationProp<any, any>) {
  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, updateDependency),
  );

  useLayoutEffect(() => {
    let newBackButton = (props: ButtonProps) => {
      return (<HeaderBackButton {...props} onPress={onBackPress} />);
    };
    navigation.setOptions({
      headerLeft: newBackButton,
    });
  }, updateDependency);
}