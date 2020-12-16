import React, { useReducer, createContext, useEffect, useRef } from "react";
import { uuidv4 } from "../lib/uuid";
import { AsyncStorage } from "react-native";
import create from "zustand";
import produce from "immer";
import { persist } from "zustand/middleware";
import * as Notifications from 'expo-notifications';

export interface Reminder {
  drug: string,
  enabled: boolean,
  repeatEveryDays: number,
  times: string[],
  instructions: string,
  id?: string,
  reminderids?: string[],
}

const initialState: Reminder[] = [{
  drug: "Panadol",
  enabled: true,
  repeatEveryDays: 1,
  times: ['08:00'],
  instructions: '',
  id: uuidv4()
}]

type ReminderStoreState = {
  reminders: Reminder[],
  toggleReminder: (id: string) => void,
  deleteReminder: (id: string) => void,
  addReminder: (rem: Reminder) => void,
  replaceReminder: (id: string, rem: Reminder) => void,
}
export const useReminderStore = create<ReminderStoreState>(persist((set, get) => ({
  reminders: initialState,
  toggleReminder: async (id: string) => {
    let notifids = await toggleReminderNotif(id, get().reminders);
    set(produce(toggleReminderFn(id, notifids)))
  },
  deleteReminder: (id: string) => set(produce(deleteReminderFn(id))),
  addReminder: (rem: Reminder) => set(produce(addReminderFn(rem))),
  replaceReminder: (id: string, rem: Reminder) => set(produce(replaceReminderFn(id, rem)))
}), {
  name: 'reminders',
  storage: AsyncStorage
}))


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  })
})

// Notifications.scheduleNotificationAsync({
//   content: {
//     title: 'You pressed a switch',
//     body: `Its ${v} now`,
//     vibrate: [0, 100]
//   },
//   trigger: null
// })

// Notifications.cancelAllScheduledNotificationsAsync();
// for when it all breaks

async function toggleReminderNotif(id: string, reminders: Reminder[]) {
  let rem = reminders.find((rem: Reminder) => rem.id === id);
  if (rem?.enabled) {
    rem.reminderids?.forEach(element => {
      Notifications.cancelScheduledNotificationAsync(element);
    });
    return []
  } else {

    let notifid = Notifications.scheduleNotificationAsync({
      content: {
        title: rem?.drug,
        body: rem?.instructions,
        vibrate: [0, 100]
      },
      trigger: { seconds: 2 },
    }).then(n => [n]);
    return notifid
  }

}

const toggleReminderFn = (id: string, notifids: string[]) => (state: ReminderStoreState) => {
  let rem = state.reminders.find((rem: Reminder) => rem.id === id)
  if (rem) {
    rem.enabled = !rem.enabled
    rem.reminderids = notifids
  }
}

const deleteReminderFn = (id: string) => (state: ReminderStoreState) => {
  let idx = state.reminders.findIndex((rem: Reminder) => rem.id === id)
  if (idx !== -1) {
    state.reminders.splice(idx, 1);
  }
}

const replaceReminderFn = (id: string, newRem: Reminder) => (state: ReminderStoreState) => {
  const idx = state.reminders.findIndex((rem: Reminder) => rem.id === id)
  if (idx !== -1) state.reminders[idx] = { ...newRem, id: state.reminders[idx].id }
}

const addReminderFn = (rem: Reminder) => (state: ReminderStoreState) => {
  rem.id = uuidv4()
  state.reminders.push(rem)
  state.reminders.sort()
}
