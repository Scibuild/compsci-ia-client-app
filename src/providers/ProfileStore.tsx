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


// 'create' is from Zustand and creates the function we can use to access the state
// 'persist' is part of Zustand and will persist the state whenever it is changed
export const useProfileStore = create<ProfileStoreState>(persist((set) => ({
  profile: initialState.profile, // the real profile
  temporaryProfile: initialState.temporaryProfile, // the editable profile before changes are saved
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
  // as long as we are in edit mode (there are items in the temp profile)
  if (state.temporaryProfile.length !== 0) {
    // set the profile to the temp profile and erase the temp profile to exit edit mode
    state.profile = state.temporaryProfile;
    state.temporaryProfile = [];
  }
}
const startProfileChanges = (state: ProfileStoreState) => {
  // if we are not in edit mode
  if (state.temporaryProfile.length === 0) {
    // normally setting an array to another array doesn't clone it but just means you have
    // two variables that point to the same thing and editing the temp profile would also 
    // change the normal profile. Because I am using Immer, there will automatically be a 
    // deep clone so we do not have to worry about this
    state.temporaryProfile = state.profile
  }
}
const dropProfileChanges = (state: ProfileStoreState) => {
  // exit edit mode but dont change the profile
  state.temporaryProfile = []
}
const setField = (fieldName: string, fieldValue: string | string[]) => (state: ProfileStoreState) => {
  if (state.temporaryProfile.length === 0) { return } // ensure we are in edit mode
  // points to the field object that the user has edited
  const field = state.temporaryProfile.find((f) => f.id === fieldName);
  if (field === undefined) { return } // if it doesn't exist don't error out, just silently return
  field.value = fieldValue; // update the field with the new value
}

const rebuildState = (state: ProfileStoreState) => {
  // only run in emergencies to set everything back to normal
  state.profile = initialState.profile;
  state.temporaryProfile = [];
}
