import { create } from "zustand";
import type { Organization, User } from "../types/domain";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  organization: Organization | null;
  user: User | null;
  setSession: (payload: {
    accessToken: string;
    refreshToken?: string | null;
    organization?: Organization | null;
    user: User;
  }) => void;
  clearSession: () => void;
};

// Initialize with a demo logged-in user so the page loads directly
export const useAuthStore = create<AuthState>((set) => ({
  accessToken: "demo-token",
  refreshToken: "demo-refresh-token",
  organization: {
    id: "org_tutorflow",
    name: "TutorFlow Academy",
    slug: "tutorflow-academy",
    timezone: "America/New_York",
  },
  user: {
    id: "user_admin",
    organizationId: "org_tutorflow",
    fullName: "Avery Brooks",
    email: "admin@tutorflow.com",
    roles: ["admin"],
  },
  setSession: (payload) =>
    set({
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken ?? null,
      organization: payload.organization ?? null,
      user: payload.user,
    }),
  clearSession: () => {
    window.localStorage.removeItem("tutorflow-auth");
    set({
      accessToken: null,
      refreshToken: null,
      organization: null,
      user: null,
    });
  },
}));
