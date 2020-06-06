import React, { useReducer, createContext } from "react";
import { uuidv4 } from "../lib/uuid";

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
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, ...action.payload.new }
          : item
      ); // update any fields that have changed only, leaving any that don't have new informaton

    case "add-sideeffect":
      return addSideEffect(state, action);
  }
}

function addSideEffect(state, action) {
  let index = state.map((i) => i.name).indexOf(action.payload.name);
  if (index >= 0) {
    return state.map((item, i) =>
      i === index
        ? { ...item, instances: [...item.instances, action.payload.instance] } // stateless append
        : item
    );
  }
  return [
    ...state,
    {
      name: action.payload.name,
      id: uuidv4(),
      instances: [action.payload.instance],
    },
  ];
}

export const SideEffectContext = createContext(null);

const initialState = [
  {
    name: "Aching Leg",
    id: uuidv4(),
    instances: [
      { time: "yesterday", severity: 7 },
      { time: "today", severity: 5 },
    ],
  },
  {
    name: "Missing Head",
    id: uuidv4(),
    instances: [
      { time: "last week", severity: 10 },
      { time: "today", severity: 3 },
    ],
  },
];

export const SymptomsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <SideEffectContext.Provider
      value={{
        state: state,
        addSideEffect: (payload) => {
          dispatch({ type: "add-sideeffect", payload });
        },
        editSideEffect: (payload) => {
          dispatch({ type: "edit-sideeffect", payload });
        },
      }}
    >
      {children}
    </SideEffectContext.Provider>
  );
};
