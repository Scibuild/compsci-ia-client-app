import React from 'react'
import { BigText, BoldText, FormattedTextInput } from './formatted'
import { timeRE } from '../lib/regularExpressions';
import { ReminderTimeToString, ReminderTimeFromString, ReminderTimeFromNumbers } from '../providers/RemindersStore';
import { AlertFooter, AlertFooterButton, CustomAlertModal } from './CustomAlertModal';

export interface SpreadTimeModalProps {
  visible: boolean,
  setVisible: (visible: boolean) => void,
  setTimes: (times: string[]) => void,
}

export const SpreadTimesModal: React.FC<SpreadTimeModalProps> = (
  { visible,
    setVisible,
    setTimes
  }
) => {
  const [beginningTime, setBeginningTime] = React.useState("")
  const [endTime, setEndTime] = React.useState("")
  const [number, setNumber] = React.useState("")
  return (
    <CustomAlertModal setVisible={setVisible} visible={visible}>
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
      <AlertFooter>
        <AlertFooterButton title="CANCEL" onPress={() => setVisible(false)} />
        <AlertFooterButton title="ENTER" onPress={() => {
          if (timeRE.test(beginningTime.trim()) && timeRE.test(endTime.trim()) && number !== "") {
            setTimes(calculateTimes(beginningTime, endTime, number))
            setVisible(false)
          }
        }} />

      </AlertFooter>
    </CustomAlertModal>
  )
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
