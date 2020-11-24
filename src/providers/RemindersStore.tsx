import React, { useReducer, createContext, useEffect, useRef } from "react";
import { uuidv4 } from "../lib/uuid";
import { AsyncStorage } from "react-native";
import create from "zustand";
import produce from "immer";
import { persist } from "zustand/middleware";

export interface Reminder {
  drug: string,
  enabled: boolean,
  repeatEveryDays: number,
  times: string[],
  instructions: string,
  id?: string,
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
export const useReminderStore = create<ReminderStoreState>(persist(set => ({
  reminders: initialState,
  toggleReminder: (id: string) => set(produce(toggleReminderFn(id))),
  deleteReminder: (id: string) => set(produce(deleteReminderFn(id))),
  addReminder: (rem: Reminder) => set(produce(addReminderFn(rem))),
  replaceReminder: (id: string, rem: Reminder) => set(produce(replaceReminderFn(id, rem)))
}), {
  name: 'reminders',
  storage: AsyncStorage
}))

const toggleReminderFn = (id: string) => (state: ReminderStoreState) => {
  let rem = state.reminders.find((rem: Reminder) => rem.id === id)
  if (rem) {
    rem.enabled = !rem.enabled
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
