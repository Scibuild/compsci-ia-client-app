import React from 'react'
import { TouchableNativeFeedback, Modal, StyleSheet, View, Text } from 'react-native'

export interface CustomAlertModalProps {
    visible: boolean,
    setVisible: (visible: boolean) => void,
    children: React.ReactNode,
}

export const CustomAlertModal: React.FC<CustomAlertModalProps> = ({ visible, setVisible, children }) => {
    return (
        <Modal animationType="fade" onRequestClose={() => setVisible(false)} visible={visible} transparent={true}>
            <View style={styles.modalBackground}>
                <View style={styles.promptWindow}>
                    {children}
                </View>
            </View>
        </Modal>)

}

interface AlertFooterButtonProps {
    onPress: () => void,
    title: string,
}

export const AlertFooterButton: React.FC<AlertFooterButtonProps> = ({ onPress, title }) => {
    return (
        <TouchableNativeFeedback onPress={onPress}>
            <View style={styles.footerButton}>
                <Text style={styles.footerButtonText}>{title}</Text>
            </View>
        </TouchableNativeFeedback>
    );
}

interface AlertFooterProps {
    children: React.ReactNode,
}

export const AlertFooter: React.FC<AlertFooterProps> = ({ children }) => {
    return (<View style={styles.footer}>{children}</View>);
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20
    },
    promptWindow: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 3,
        alignSelf: 'stretch',
        elevation: 5
    },
    footer: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    footerButtonText: {
        color: "steelblue",
        fontSize: 14,
        fontWeight: "bold",
    },
    footerButton: {
        padding: 10,
        borderRadius: 3,
    }
})