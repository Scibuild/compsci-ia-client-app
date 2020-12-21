import { uuidv4 } from "../lib/uuid";
import { AsyncStorage } from "react-native";
import create from "zustand";
import produce from "immer";
import { persist } from "zustand/middleware";
import * as Notifications from 'expo-notifications';

export interface Reminder {
  drug: string,
  enabled: boolean,
  times: ReminderTime[],
  instructions: string,
  id?: string,
  notificationids?: string[],
}
export interface ReminderTime {
  minute: number,
  hour: number,
}
export const ReminderTimeFromNumbers = (hour: number, minute: number): ReminderTime => {
  return { hour, minute }
}
export const ReminderTimeToString = (remtime: ReminderTime): string => {
  const h = ("00" + remtime.hour.toString()).slice(-2) // selects last two characters to ensure padded 0s
  const m = ("00" + remtime.minute.toString()).slice(-2)
  return h + ":" + m;
}

export const ReminderTimeFromString = (timeString: string): ReminderTime => {

  const h = timeString.slice(0, 2);
  const m = timeString.slice(3, 5);
  // return new ReminderTime(+h, +m)
  return ReminderTimeFromNumbers(Number(h), Number(m))
}

const initialState: Reminder[] = [{
  drug: "Panadol",
  enabled: true,
  times: [ReminderTimeFromNumbers(8, 0)],
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
    const notifids = await toggleReminderNotif(id, get().reminders);
    set(produce(toggleReminderFn(id, notifids)))
  },
  deleteReminder: async (id: string) => {
    cancelNotifications(get().reminders.find(r => r.id === id))
    set(produce(deleteReminderFn(id)))
  },
  addReminder: async (rem: Reminder) => {
    const notifids = await initialiseNotifications(rem);
    set(produce(addReminderFn(rem, notifids)))
  },
  replaceReminder: async (id: string, rem: Reminder) => {
    const oldrem = get().reminders.find(r => r.id === id);
    cancelNotifications(oldrem)
    rem.notificationids = await initialiseNotificationsIfEnabled(rem, oldrem?.enabled);
    set(produce(replaceReminderFn(id, rem)))
  },
}), {
  name: 'reminders',
  storage: AsyncStorage,
  // re-registers all notifications when the current reminders are loaded from storage, 
  // (on app startup), ensures notifications are always in sync with displayed data
  // default serialisation is with JSON, so JSON.parse converts back
  deserialize: async (stored) => {
    const state = JSON.parse(stored)
    Notifications.cancelAllScheduledNotificationsAsync();
    //both updates notification ids and creates new notifs
    return initialiseAllNotifications(state)
  }
}))


async function toggleReminderNotif(id: string, reminders: Reminder[]) {
  const rem = reminders.find((rem: Reminder) => rem.id === id);
  if (rem?.enabled) {
    // cancel the currently scheduled notifications if they were previously enabled 
    cancelNotifications(rem);
    // no longer any ids to keep track off
    return [];
  } else {
    // otherwise initialise them and return their ids
    return initialiseNotifications(rem);
  }

}

const toggleReminderFn = (id: string, notifids: string[]) => (state: ReminderStoreState) => {
  const rem = state.reminders.find((rem: Reminder) => rem.id === id)
  if (rem) {
    rem.enabled = !rem.enabled
    rem.notificationids = notifids
  }
}

const deleteReminderFn = (id: string) => (state: ReminderStoreState) => {
  const idx = state.reminders.findIndex((rem: Reminder) => rem.id === id)
  if (idx !== -1) {
    state.reminders.splice(idx, 1);
  }
}

const replaceReminderFn = (id: string, newRem: Reminder) => (state: ReminderStoreState) => {
  const idx = state.reminders.findIndex((rem: Reminder) => rem.id === id)
  if (idx !== -1) state.reminders[idx] = { ...newRem, id: state.reminders[idx].id, enabled: state.reminders[idx].enabled }
}

const addReminderFn = (rem: Reminder, notifids: string[]) => (state: ReminderStoreState) => {
  rem.id = uuidv4()
  rem.notificationids = notifids
  state.reminders.push(rem)
  state.reminders.sort()
}

const initialiseAllNotifications = async (state: ReminderStoreState) => {
  // Promise.all converts an array of promises into a promise for an array
  state.reminders = await Promise.all(state.reminders.map(async (rem) => {
    if (!rem.enabled) {
      return rem;
    }
    const notifids = await initialiseNotifications(rem);
    rem.notificationids = notifids;
    return rem
  }));

  return state
}

async function initialiseNotifications(reminder?: Reminder): Promise<string[]> {
  const notifids: Promise<string>[] = [];
  // eslint-disable-next-line no-unused-expressions
  reminder?.times.forEach(time => {
    const notifid = Notifications.scheduleNotificationAsync({
      content: {
        title: reminder?.drug,
        body: reminder?.instructions,
        vibrate: [0, 100]
      },
      trigger: {
        hour: time.hour,
        minute: time.minute,
        repeats: true
      },
    });
    notifids.push(notifid)
  });
  return Promise.all(notifids);
}

async function initialiseNotificationsIfEnabled(reminder?: Reminder, enabled?: boolean): Promise<string[]> {
  if (enabled !== null ? enabled : reminder?.enabled) {
    return initialiseNotifications(reminder);
  } else {
    return [];
  }
}


async function cancelNotifications(reminder?: Reminder) {
  // eslint-disable-next-line no-unused-expressions
  reminder?.notificationids?.forEach(element => {
    Notifications.cancelScheduledNotificationAsync(element)
  });
}

