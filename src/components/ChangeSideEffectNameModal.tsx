import React from 'react';
import { AlertFooter, AlertFooterButton, CustomAlertModal } from './CustomAlertModal';
import { BigText, BoldText, FormattedTextInput } from './formatted';

interface ChangeSideEffectNameModalProps {
    visible: boolean,
    setVisible: (v: boolean) => void,
    sideEffectId: string,
    sideEffectName: string,
    editSideEffectName: (id: string, newName: string) => void
}

export const ChangeSideEffectNameModal: React.FC<ChangeSideEffectNameModalProps> = ({
    visible, setVisible, sideEffectId, editSideEffectName, sideEffectName
}) => {
    const [newName, setNewName] = React.useState(sideEffectName)
    return (
        <CustomAlertModal visible={visible} setVisible={setVisible}>
            <BoldText><BigText>New Name</BigText></BoldText>
            <FormattedTextInput
                value={newName}
                onChangeText={setNewName}
                placeholder=""
                err={newName === ""}
            />
            <AlertFooter>
                <AlertFooterButton title="CANCEL" onPress={() => {
                    setVisible(false);
                    setNewName(sideEffectName);
                }} />
                <AlertFooterButton title="SAVE" onPress={() => {
                    editSideEffectName(sideEffectId, newName);
                    setVisible(false);
                }} />
            </AlertFooter>
        </CustomAlertModal>
    );
};