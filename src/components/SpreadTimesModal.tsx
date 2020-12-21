import React from 'react'
import { TouchableNativeFeedback, Modal, StyleSheet, View, Text } from 'react-native'
import { BigText, BoldText, FormattedTextInput } from './formatted'
import { timeRE } from '../lib/regularExpressions';
import { ReminderTimeToString, ReminderTimeFromString, ReminderTimeFromNumbers } from '../providers/RemindersStore';

export interface SpreadTimeModalProps {
  visible: boolean,
  setVisible: (visible: boolean) => void,
  beginningTime: string,
  setBeginningTime: (beginningTime: string) => void,
  endTime: string,
  setEndTime: (endTime: string) => void,
  number: string,
  setNumber: (number: string) => void,
  setTimes: (times: string[]) => void,
}

export const SpreadTimesModal: React.FC<SpreadTimeModalProps> = (
  { visible,
    setVisible,
    beginningTime,
    setBeginningTime,
    endTime,
    setEndTime,
    number,
    setNumber,
    setTimes
  }
) => {
  return (
    <Modal animationType="fade" onRequestClose={() => setVisible(false)} visible={visible} transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.promptWindow}>
          <BoldText><BigText>Daily repeats</BigText></BoldText>
          <BigText>Beginning Time</BigText>
          <FormattedTextInput
            value={beginningTime}
            onChangeText={(v) => setBeginningTime(v.replace(/[^0-9:]+/, ''))}
            placeholder="08:00"
            err={!timeRE.test(beginningTime.trim())}
          />
          <BigText>End Time</BigText>
          <FormattedTextInput
            value={endTime}
            onChangeText={(v) => setEndTime(v.replace(/[^0-9:]+/, ''))}
            placeholder="20:00"
            err={!timeRE.test(endTime.trim())}
          />
          <BigText>Number of times</BigText>
          <FormattedTextInput
            value={number}
            onChangeText={(v) => setNumber(v.replace(/[^0-9]+/, ''))}
            placeholder="3"
            err={number === ""}
            keyboardType="number-pad"
          />
          <View style={styles.footer}>
            <FooterButton title="CANCEL" onPress={() => setVisible(false)} />
            <FooterButton title="ENTER" onPress={() => {
              if (timeRE.test(beginningTime.trim()) && timeRE.test(endTime.trim()) && number !== "") {
                setTimes(calculateTimes(beginningTime, endTime, number))
                setVisible(false)
              }
            }} />
          </View>
        </View>
      </View>
    </Modal>)

}

function calculateTimes(beginningTime: string, endTime: string, number: string): string[] {
  // T for time, M for minutes, N for number
  const beginningTimeT = ReminderTimeFromString(beginningTime)
  const beginningTimeM = beginningTimeT.minute + beginningTimeT.hour * 60

  const endTimeT = ReminderTimeFromString(endTime)
  const endTimeM = endTimeT.minute + endTimeT.hour * 60

  const differenceM = endTimeM - beginningTimeM

  const numberN = Number(number)
  const times: string[] = []

  if (numberN < 2) {
    return [ReminderTimeToString(beginningTimeT)]
  }

  for (let i = 0; i < numberN; i++) { // i goes from 0 to numberN-1, if numberN = 3, then 0,1,2
    const minuteOffset = differenceM / (numberN - 1) * i; // first has no offset (beginning), last is at end
    const reminderM = minuteOffset + beginningTimeM;
    const reminderT = ReminderTimeFromNumbers(Math.floor(reminderM / 60), Math.round(reminderM % 60))
    times.push(ReminderTimeToString(reminderT))
  }

  return times;
}

interface FooterButtonProps {
  onPress: () => void,
  title: string,
}

const FooterButton: React.FC<FooterButtonProps> = ({ onPress, title }) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.footerButton}>
        <Text style={styles.footerButtonText}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
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