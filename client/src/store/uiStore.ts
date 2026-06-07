import { create } from "zustand";

export type DrawerState = "closed" | "session" | "reschedule" | "billing" | "new-session";

export type ToastType = "success" | "error" | "info" | "warning";

type UiState = {
  sidebarOpen: boolean;
  drawer: DrawerState;
  selectedSessionId: string | null;
  toast: { message: string; type: ToastType } | null;
  newSessionDraft: { date: string; time: string } | null;
  setSidebarOpen: (value: boolean) => void;
  setDrawer: (drawer: DrawerState, selectedSessionId?: string | null) => void;
  setNewSessionDraft: (draft: { date: string; time: string } | null) => void;
  showToast: (message: string, type?: ToastType) => void;
  hideToast: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  sidebarOpen: false, // Default closed on mobile, sidebar will toggle on mobile.
  drawer: "closed",
  selectedSessionId: null,
  toast: null,
  newSessionDraft: null,
  setSidebarOpen: (value) => set({ sidebarOpen: value }),
  setDrawer: (drawer, selectedSessionId = null) =>
    set({ drawer, selectedSessionId }),
  setNewSessionDraft: (draft) => set({ newSessionDraft: draft }),
  showToast: (message, type = "info") => {
    set({ toast: { message, type } });
    setTimeout(() => {
      set({ toast: null });
    }, 3000);
  },
  hideToast: () => set({ toast: null }),
}));
