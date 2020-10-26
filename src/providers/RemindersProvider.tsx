import React, { useReducer, createContext, useEffect, useRef } from "react";
import { uuidv4 } from "../lib/uuid";
import { AsyncStorage } from "react-native";

/*

type = "edit-sideeffect" --> action.payload = {
  id: id being edited
  new: new 'side effect' to replace any defined fields with new
}
type = "add-sideeffect" --> action.payload = {
  name: name of the new side effect
  instance: normally something like {time, severity}
}

*/
function reducer(state, action) {
  switch (action.type) {
    case "edit-sideeffect":
      return [
        ...state.map(item =>
          item.id === action.payload.id
            ? { ...item, ...action.payload.new }
            : item,
        ),
      ].sort((a, b) => a.name.localeCompare(b.name)); // update any fields that have changed only, leaving any that don't have new informaton

    case "add-sideeffect":
      return addSideEffect(state, action);
    case "init-sideeffects":
      return action.payload;
    case "deleteid-sideeffect":
      return state.filter(item => item.id !== action.id);
  }
}

function addSideEffect(state, action) {
  let index = state.map(i => i.name).indexOf(action.payload.name);
  if (index >= 0) {
    return state.map((item, i) =>
      i === index
        ? {
          ...item,
          instances: [...item.instances, action.payload.instance].sort(
            (a, b) => a.time - b.time,
          ),
        } // stateless append
        : item,
    );
  }
  console.log(action.payload.name);
  let presort = [
    ...state,
    {
      name: action.payload.name,
      id: uuidv4(),
      instances: [action.payload.instance],
    },
  ];
  return presort.sort((a, b) => a.name.localeCompare(b.name));
}

export const RemindersContext = createContext(null);

const initialState: Array<{ title: string, enabled: boolean }> = [
  { title: "1", enabled: true }
];

type RemindersProviderProps = { children: React.ReactNode }
export const RemindersProvider = ({ children }: RemindersProviderProps) => {
  const isCurrent = useRef(true);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    AsyncStorage.getItem("side-effects").then(storedState => {
      if (storedState && isCurrent.current) {
        dispatch({
          type: "init-sideeffects",
          payload: JSON.parse(storedState),
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
      AsyncStorage.setItem("side-effects", JSON.stringify(state));
    }
  }, [state]);

  return (
    <RemindersContext.Provider
      value={{
        state: state,
        addSideEffect: payload => {
          if (isCurrent.current) {
            dispatch({ type: "add-sideeffect", payload });
          }
        },
        editSideEffect: payload => {
          if (isCurrent.current) {
            dispatch({ type: "edit-sideeffect", payload });
          }
        },
        deleteSideEffectById: id => {
          if (isCurrent.current) {
            dispatch({ type: "deleteid-sideeffect", id });
          }
        },
      }}
    >
      {children}
    </.Provider>
  );
};
