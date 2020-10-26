import React, { FC, ReactChild } from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';

type TouchableListItemType = { onPress: () => any, children: React.ReactNode }
export const TouchableListItem = ({ onPress, children }: TouchableListItemType) => {
    return (
        <RectButton
            style={styles.listItemTouchable}
            onPress={onPress}
        >
            <View accessible>
                {children}
            </View>
        </RectButton>
    );
};

const styles = StyleSheet.create({
    listItemTouchable: {
        padding: 15,
    },
    listItemText: {
        fontSize: 20,
    },
});