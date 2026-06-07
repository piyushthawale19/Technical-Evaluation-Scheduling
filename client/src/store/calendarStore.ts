import { create } from "zustand";
import type { Session } from "../types/domain";

export type CalendarView = "day" | "week" | "month";

type CalendarState = {
  view: CalendarView;
  setView: (view: CalendarView) => void;
  sessions: Session[];
  setSessions: (sessions: Session[]) => void;
  selectedSessionId: string | null;
  selectSession: (sessionId: string | null) => void;
};

export const useCalendarStore = create<CalendarState>((set) => ({
  view: "week",
  setView: (view) => set({ view }),
  sessions: [],
  setSessions: (sessions) => set({ sessions }),
  selectedSessionId: null,
  selectSession: (sessionId) => set({ selectedSessionId: sessionId }),
}));
