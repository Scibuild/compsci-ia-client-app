import { uuidv4 } from "../lib/uuid";
import { AsyncStorage } from "react-native";
import create from "zustand";
import { persist } from "zustand/middleware";
import produce from "immer";


export type SideEffectsStoreState = {
  sideEffects: SideEffect[],
  addSideEffect: (name: string, instance: SideEffectInstance) => void,
  editSideEffectName: (id: string, newName: string) => void,
  editSideEffectInstance: (id: string, instanceid: string, newInstance: Partial<SideEffectInstance>) => void,
  deleteSideEffectById: (id: string) => void,
  deleteSideEffectInstance: (id: string, instanceid: string) => void
}

export interface SideEffect {
  name: string,
  id?: string,
  instances: SideEffectInstance[]
}

export interface SideEffectInstance {
  time: number,
  severity: number,
  id?: string,
  currentMedication: string[]
}

const initialState: SideEffect[] = [
  {
    name: "Aching Leg",
    id: uuidv4(),
    instances: [
      { time: new Date().getTime(), severity: 7, id: uuidv4(), currentMedication: [] },
      { time: new Date().getTime(), severity: 5, id: uuidv4(), currentMedication: [] },
    ],
  },
  {
    name: "Missing Head",
    id: uuidv4(),
    instances: [
      { time: new Date().getTime(), severity: 10, id: uuidv4(), currentMedication: [] },
      { time: new Date().getTime(), severity: 3, id: uuidv4(), currentMedication: [] },
    ],
  },
];

export const useSideEffectStore = create<SideEffectsStoreState>(persist((set) => ({
  sideEffects: initialState,
  addSideEffect: (name, instance) => set(produce(addSideEffect(name, instance))),
  editSideEffectName: (id, newName) => set(produce(editSideEffectName(id, newName))),
  editSideEffectInstance: (id, instanceid, newInstance) => set(produce(editSideEffectInstance(id, instanceid, newInstance))),
  deleteSideEffectById: (id) => set(produce(deleteSideEffectById(id))),
  deleteSideEffectInstance: (id, instanceid) => set(produce(deleteSideEffectInstance(id, instanceid))),
}), {
  name: 'sideEffects',
  storage: AsyncStorage
}))

const addSideEffect = (name: string, instance: SideEffectInstance) => (state: SideEffectsStoreState) => {
  const index = state.sideEffects.map(i => i.name).indexOf(name);
  instance.id = uuidv4()
  if (index >= 0) {
    state.sideEffects[index].instances.push(instance);
    state.sideEffects[index].instances.sort((a, b) => b.time - a.time)
  } else {
    state.sideEffects.push({
      name,
      id: uuidv4(),
      instances: [instance]
    })
    state.sideEffects.sort((a, b) => a.name.localeCompare(b.name))
  }
}

const editSideEffectName = (id: string, newName: string) => (state: SideEffectsStoreState) => {
  const index = state.sideEffects.map(i => i.id).indexOf(id);
  state.sideEffects[index].name = newName
  state.sideEffects.sort((a, b) => a.name.localeCompare(b.name))
}
const editSideEffectInstance = (id: string, instanceid: string, newInstance: Partial<SideEffectInstance>) => (state: SideEffectsStoreState) => {
  const sideeffect = state.sideEffects.find((s) => s.id === id);
  if (sideeffect === undefined) { return }
  const instanceindex = sideeffect.instances.map(i => i.id).indexOf(instanceid)
  sideeffect.instances[instanceindex] = {
    ...sideeffect?.instances[instanceindex],
    ...newInstance
  }
}

const deleteSideEffectById = (id: string) => (state: SideEffectsStoreState) => {
  state.sideEffects = state.sideEffects.filter(item => item.id !== id);
}

const deleteSideEffectInstance = (id: string, instanceid: string) => (state: SideEffectsStoreState) => {
  const sideEffect = state.sideEffects.find(v => v.id === id);
  if (sideEffect === undefined) { return }
  if (sideEffect.instances.length === 1) {
    state.sideEffects = state.sideEffects.filter(item => item.id !== id);
  } else {
    sideEffect.instances = sideEffect?.instances.filter(v => v.id !== instanceid)
  }
}
