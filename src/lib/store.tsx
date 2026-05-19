"use client";

import React, { createContext, useContext, useEffect, useReducer, type ReactNode } from "react";
import { AppState, PracticeProgress, RepairAnalysis } from "./types";

// Actions
type Action =
  | { type: "ADD_REPAIR"; repair: RepairAnalysis }
  | { type: "SET_CURRENT_REPAIR"; repair: RepairAnalysis | null }
  | { type: "UPDATE_REPAIR_STATUS"; id: string; status: RepairAnalysis["repairStatus"]; confidence?: number }
  | { type: "UPDATE_PRACTICE"; repairId: string; progress: PracticeProgress }
  | { type: "LOAD_STATE"; state: AppState }
  | { type: "REMOVE_REPAIR"; id: string }
  | { type: "COMPLETE_ONBOARDING" };

const initialState: AppState = {
  repairs: [],
  currentRepair: null,
  practiceProgress: {},
  totalRepaired: 0,
  totalInProgress: 0,
  hasCompletedOnboarding: false,
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "ADD_REPAIR": {
      const exists = state.repairs.find((r) => r.id === action.repair.id);
      const repairs = exists
        ? state.repairs.map((r) => (r.id === action.repair.id ? action.repair : r))
        : [...state.repairs, action.repair];
      return {
        ...state,
        repairs,
        currentRepair: action.repair,
        totalRepaired: repairs.filter((r) => r.repairStatus === "repaired").length,
        totalInProgress: repairs.filter((r) => r.repairStatus === "repairing").length,
      };
    }
    case "SET_CURRENT_REPAIR":
      return { ...state, currentRepair: action.repair };
    case "UPDATE_REPAIR_STATUS": {
      const repairs = state.repairs.map((r) =>
        r.id === action.id
          ? {
              ...r,
              repairStatus: action.status,
              confidenceScore: action.confidence ?? r.confidenceScore,
            }
          : r
      );
      return {
        ...state,
        repairs,
        currentRepair:
          state.currentRepair?.id === action.id
            ? { ...state.currentRepair, repairStatus: action.status, confidenceScore: action.confidence ?? state.currentRepair.confidenceScore }
            : state.currentRepair,
        totalRepaired: repairs.filter((r) => r.repairStatus === "repaired").length,
        totalInProgress: repairs.filter((r) => r.repairStatus === "repairing").length,
      };
    }
    case "UPDATE_PRACTICE":
      return {
        ...state,
        practiceProgress: {
          ...state.practiceProgress,
          [action.repairId]: action.progress,
        },
      };
    case "REMOVE_REPAIR": {
      const repairs = state.repairs.filter((r) => r.id !== action.id);
      return {
        ...state,
        repairs,
        currentRepair: state.currentRepair?.id === action.id ? null : state.currentRepair,
        totalRepaired: repairs.filter((r) => r.repairStatus === "repaired").length,
        totalInProgress: repairs.filter((r) => r.repairStatus === "repairing").length,
      };
    }
    case "COMPLETE_ONBOARDING":
      return { ...state, hasCompletedOnboarding: true };
    case "LOAD_STATE":
      return action.state;
    default:
      return state;
  }
}

// Context
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  addRepair: (repair: RepairAnalysis) => void;
  updateRepairStatus: (id: string, status: RepairAnalysis["repairStatus"], confidence?: number) => void;
  updatePractice: (repairId: string, progress: PracticeProgress) => void;
  removeRepair: (id: string) => void;
  completeOnboarding: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = "kintsugi-notes-state";

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: "LOAD_STATE", state: { ...initialState, ...parsed } });
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Save to localStorage on state changes
  useEffect(() => {
    try {
      const toSave = {
        repairs: state.repairs,
        practiceProgress: state.practiceProgress,
        totalRepaired: state.totalRepaired,
        totalInProgress: state.totalInProgress,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch {
      // Ignore storage errors
    }
  }, [state.repairs, state.practiceProgress, state.totalRepaired, state.totalInProgress, state.hasCompletedOnboarding]);

  const addRepair = (repair: RepairAnalysis) =>
    dispatch({ type: "ADD_REPAIR", repair });

  const updateRepairStatus = (id: string, status: RepairAnalysis["repairStatus"], confidence?: number) =>
    dispatch({ type: "UPDATE_REPAIR_STATUS", id, status, confidence });

  const updatePractice = (repairId: string, progress: PracticeProgress) =>
    dispatch({ type: "UPDATE_PRACTICE", repairId, progress });

  const removeRepair = (id: string) =>
    dispatch({ type: "REMOVE_REPAIR", id });

  const completeOnboarding = () =>
    dispatch({ type: "COMPLETE_ONBOARDING" });

  return (
    <AppContext.Provider
      value={{ state, dispatch, addRepair, updateRepairStatus, updatePractice, removeRepair, completeOnboarding }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppState must be used within AppProvider");
  return context;
}
