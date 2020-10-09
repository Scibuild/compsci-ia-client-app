import React, { useReducer, createContext, useEffect, useRef } from "react";
import { AsyncStorage } from "react-native";

function reducer(state, action) {
  switch (action.type) {
    case "commit":
      if (state.temporaryProfile.length === 0) {
        return { ...state };
      } else {
        return { profile: [...state.temporaryProfile], temporaryProfile: [] };
      }
    case "drop-temp":
      return { profile: [...state.profile], temporaryProfile: [] };
    case "create-temp":
      return {
        profile: [...state.profile],
        temporaryProfile: [...state.profile],
      };
    case "set-field":
      if (state.temporaryProfile.length === 0) {
        return {
          profile: [...state.profile],
          temporaryProfile: state.profile.map(field =>
            field.id === action.payload.id
              ? { ...field, value: action.payload.value }
              : field,
          ),
        };
      } else {
        return {
          profile: [...state.profile],
          temporaryProfile: state.temporaryProfile.map(field =>
            field.id === action.payload.id
              ? { ...field, value: action.payload.value }
              : field,
          ),
        };
      }
    case "init-profile":
      return { profile: action.payload, temporaryProfile: [] };
    default:
      return { ...state };
  }
}

export const ProfileContext = createContext(null);

const initialState = {
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

export const ProfileProvider = ({ children }) => {
  const isCurrent = useRef(true);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    AsyncStorage.getItem("profile").then(storedState => {
      if (storedState && isCurrent.current) {
        dispatch({
          type: "init-profile",
          payload: JSON.parse(storedState),
        });
      }
      if (storedState.length === 0) {
        dispatch({
          type: "init-profile",
          payload: initialState.profile,
        });
      }
    });
    isCurrent.current = true;

    // runs when component unmounts to prevent state being set when doesn't exist
    return () => {
      isCurrent.current = false;
    };
  }, []);

  useEffect(() => {
    if (state && state !== "") {
      AsyncStorage.setItem("profile", JSON.stringify(state.profile));
    }
  }, [state.profile]);

  return (
    <ProfileContext.Provider
      value={{
        profile: state.profile,
        tempProfile: state.temporaryProfile,
        commitProfileChanges: () => {
          if (isCurrent.current) {
            dispatch({ type: "commit" });
          }
        },
        startProfileChanges: () => {
          if (isCurrent.current) {
            dispatch({ type: "create-temp" });
          }
        },
        dropProfileChanges: () => {
          if (isCurrent.current) {
            dispatch({ type: "drop-temp" });
          }
        },
        setField: fieldName => fieldValue => {
          if (isCurrent.current) {
            dispatch({
              type: "set-field",
              payload: { id: fieldName, value: fieldValue },
            });
          }
        },
        rebuildState: () => {
          if (isCurrent.current) {
            dispatch({
              type: "init-profile",
              payload: initialState.profile,
            });
          }
        },
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
