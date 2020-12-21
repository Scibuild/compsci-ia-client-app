import produce from "immer";
import { AsyncStorage } from "react-native";
import create from "zustand";
import { persist } from "zustand/middleware";

export type ProfileStoreState = {
  profile: ProfileItem[],
  temporaryProfile: ProfileItem[],

  commitProfileChanges: () => void,
  startProfileChanges: () => void,
  dropProfileChanges: () => void,
  setField: (fieldName: string) => (fieldValue: string | string[]) => void,
  rebuildState: () => void,

}

export interface ProfileItem {
  name: string, id: string, value: string | string[]
}

export const useProfileStore = create<ProfileStoreState>(persist((set) => ({
  profile: initialState.profile,
  temporaryProfile: initialState.temporaryProfile,
  commitProfileChanges: () => set(produce(commitProfileChanges)),
  startProfileChanges: () => set(produce(startProfileChanges)),
  dropProfileChanges: () => set(produce(dropProfileChanges)),
  setField: (fieldName) => (fieldValue) => set(produce(setField(fieldName, fieldValue))),
  rebuildState: () => set(produce(rebuildState)),
}), {
  name: "profile",
  storage: AsyncStorage
}))

const commitProfileChanges = (state: ProfileStoreState) => {
  if (state.temporaryProfile.length !== 0) {
    state.profile = state.temporaryProfile;
    state.temporaryProfile = [];
  }
}
const startProfileChanges = (state: ProfileStoreState) => {
  state.temporaryProfile = state.profile // immer should handle the deep clone here
}
const dropProfileChanges = (state: ProfileStoreState) => {
  state.temporaryProfile = []
}
const setField = (fieldName: string, fieldValue: string | string[]) => (state: ProfileStoreState) => {
  if (state.temporaryProfile.length === 0) { return }
  const field = state.temporaryProfile.find((f) => f.id === fieldName);
  if (field === undefined) { return }
  field.value = fieldValue;
}

const rebuildState = (state: ProfileStoreState) => {
  state.profile = initialState.profile;
  state.temporaryProfile = [];
}

const initialState: { profile: ProfileItem[], temporaryProfile: ProfileItem[] } = {
  profile: [
    { name: "Name", id: "name", value: "" },
    { name: "DOB", id: "dob", value: "" },
    { name: "Medicare Number", id: "medicare-number", value: "" },
    { name: "Private insurance company", id: "pi-company", value: "" },
    { name: "Private insurance number", id: "pi-number", value: "" },
    { name: "Contact telephone", id: "contact-telephone", value: "" },
    { name: "Contact email", id: "contact-email", value: "" },
    { name: "Home address", id: "home-address", value: "" },
    { name: "General practitioner name", id: "gp-name", value: "" },
    { name: "General practitioner address", id: "gp-address", value: "" },
    { name: "Next of kin name", id: "nok-name", value: "" },
    { name: "Next of kin address", id: "nok-address", value: "" },
    { name: "Previous Surgery", id: "previous-surgery", value: [] },
    { name: "Health Conditions", id: "health-conditions", value: [] },
    { name: "Allergies", id: "allergies", value: [] },
    { name: "Previous scans", id: "scans", value: [] },
  ],
  temporaryProfile: [],
};