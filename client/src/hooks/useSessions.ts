import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useCalendarStore } from "@/store/calendarStore";
import type { Session } from "@/types/domain";

export function useSessions() {
  const sessions = useCalendarStore((state) => state.sessions);
  return useQuery({
    queryKey: ["sessions"],
    queryFn: async () => ({ sessions }),
    initialData: { sessions },
  });
}

export function useRefreshSessions() {
  const setSessions = useCalendarStore((state) => state.setSessions);
  return async () => {
    const response = await api.get<{ sessions: Session[] }>("/sessions");
    setSessions(response.sessions);
  };
}
