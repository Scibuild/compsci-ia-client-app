import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';

type TouchableListItemProps = { onPress: () => any, children: React.ReactNode }
export const TouchableListItem: React.FC<TouchableListItemProps> = ({ onPress, children }) => {
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