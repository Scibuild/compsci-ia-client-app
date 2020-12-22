import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';

type TouchableListItemProps = { onPress: () => any, children: React.ReactNode, style?: any, enabled?: boolean }
export const TouchableListItem: React.FC<TouchableListItemProps> = ({ onPress, children, style, enabled = true }) => {
    return (
        <RectButton
            style={styles.listItemTouchable}
            onPress={onPress}
            enabled={enabled}
        >
            <View accessible style={style}>
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