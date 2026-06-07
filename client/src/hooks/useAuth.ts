import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import type { Organization, User } from "@/types/domain";

type AuthResponse = {
  organization: { _id: string; name: string; timezone: string };
  user: {
    _id: string;
    organizationId: string;
    fullName: string;
    email: string;
    roles: string[];
  };
  tokens: { accessToken: string; refreshToken: string };
};

export function useLoginMutation() {
  const setSession = useAuthStore((state) => state.setSession);
  return useMutation({
    mutationFn: (payload: { email: string; password: string }) =>
      api.post<AuthResponse>("/auth/login", payload),
    onSuccess: (data) => {
      setSession({
        accessToken: data.tokens.accessToken,
        refreshToken: data.tokens.refreshToken,
        organization: {
          id: data.organization._id,
          name: data.organization.name,
          timezone: data.organization.timezone,
        } satisfies Organization,
        user: {
          id: data.user._id,
          organizationId: data.user.organizationId,
          fullName: data.user.fullName,
          email: data.user.email,
          roles: data.user.roles as User["roles"],
        },
      });
    },
  });
}
