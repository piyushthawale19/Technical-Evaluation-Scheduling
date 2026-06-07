import { useAuthStore } from "../store/authStore";

const apiBaseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

type RequestOptions = RequestInit & { json?: unknown };

async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const token = useAuthStore.getState().accessToken;
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers,
    body: options.json ? JSON.stringify(options.json) : options.body,
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json() as Promise<T>;
}

export const api = {
  request,
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", json: body }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PUT", json: body }),
  login: (payload: { email: string; password: string }) =>
    request<{ user: any; organization: any; tokens: { accessToken: string; refreshToken?: string } }>("/auth/login", { method: "POST", json: payload }),
  register: (payload: {
    organizationName: string;
    fullName: string;
    email: string;
    password: string;
  }) => request<{ user: any; organization: any; tokens: { accessToken: string; refreshToken?: string } }>("/auth/register", { method: "POST", json: payload }),
  getDashboard: async () => ({
    summary: (await import("../data/mockData")).dashboardSummary,
  }),
  getSessions: async () => ({
    sessions: (await import("../data/mockData")).sessions,
  }),
  getInvoices: async () => ({
    invoices: (await import("../data/mockData")).invoices,
  }),
  getAdjustments: async () => ({
    adjustments: (await import("../data/mockData")).adjustments,
  }),
  getAuditLogs: async () => ({
    logs: (await import("../data/mockData")).auditLogs,
  }),
};
