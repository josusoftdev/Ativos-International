const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api"
).replace(/\/$/, "");

const AUTH_STORAGE_KEY = "ativos-international:auth";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthSession extends AuthTokens {
  user: AuthUser;
}

export interface UserProfile extends AuthUser {
  avatarUrl: string | null;
  createdAt: string;
  plan: {
    id: string;
    name: string;
    isFree: boolean;
  } | null;
}

export interface WalletAsset {
  id: string;
  symbol: string;
  name: string;
  iconUrl: string | null;
  amount: string | number;
  avgPrice: string | number;
}

export interface Wallet {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  assets: WalletAsset[];
}

export interface Plan {
  id: string;
  name: string;
  description: string | null;
  price: string | number;
  isFree: boolean;
  features: string[];
}

interface AuthResponse extends AuthTokens {
  user: AuthUser;
}

interface ApiRequestOptions extends RequestInit {
  auth?: boolean;
  retry?: boolean;
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly payload?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

function isBrowser() {
  return typeof window !== "undefined";
}

function extractApiMessage(payload: unknown, fallback: string) {
  if (payload && typeof payload === "object") {
    const maybeMessage = (payload as { message?: unknown }).message;

    if (Array.isArray(maybeMessage)) {
      return maybeMessage.join(" ");
    }

    if (typeof maybeMessage === "string") {
      return maybeMessage;
    }

    const maybeError = (payload as { error?: unknown }).error;
    if (typeof maybeError === "string") {
      return maybeError;
    }
  }

  return fallback;
}

export function getApiErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Nao foi possivel completar a operacao.";
}

export function getStoredSession(): AuthSession | null {
  if (!isBrowser()) {
    return null;
  }

  const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    clearAuthSession();
    return null;
  }
}

export function saveAuthSession(session: AuthSession) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event("auth-session-changed"));
}

export function clearAuthSession() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.dispatchEvent(new Event("auth-session-changed"));
}

async function readPayload(response: Response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

async function refreshSession(session: AuthSession) {
  try {
    const tokens = await apiRequest<AuthTokens>("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken: session.refreshToken }),
      retry: false,
    });

    const nextSession = { ...session, ...tokens };
    saveAuthSession(nextSession);
    return nextSession;
  } catch (error) {
    clearAuthSession();
    throw error;
  }
}

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { auth = false, retry = true, headers, ...init } = options;
  const requestHeaders = new Headers(headers);
  const session = getStoredSession();

  if (init.body && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (auth && session?.accessToken) {
    requestHeaders.set("Authorization", `Bearer ${session.accessToken}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: requestHeaders,
  });

  if (response.status === 401 && auth && retry && session?.refreshToken) {
    await refreshSession(session);
    return apiRequest<T>(path, { ...options, retry: false });
  }

  const payload = await readPayload(response);

  if (!response.ok) {
    throw new ApiError(
      response.status,
      extractApiMessage(payload, response.statusText),
      payload,
    );
  }

  return payload as T;
}

export async function loginUser(payload: {
  email: string;
  password: string;
}) {
  const auth = await apiRequest<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  const session: AuthSession = { ...auth };

  saveAuthSession(session);
  return session;
}

export async function registerUser(payload: {
  name: string;
  email: string;
  password: string;
}) {
  const auth = await apiRequest<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  const session: AuthSession = { ...auth };

  saveAuthSession(session);
  return session;
}

export async function logoutUser() {
  const session = getStoredSession();

  try {
    if (session) {
      await apiRequest<{ message: string }>("/auth/logout", {
        method: "POST",
        auth: true,
      });
    }
  } finally {
    clearAuthSession();
  }
}

export function getProfile() {
  return apiRequest<UserProfile>("/users/me", { auth: true });
}

export function getWallets() {
  return apiRequest<Wallet[]>("/wallets", { auth: true });
}

export function createWallet(payload: { name: string }) {
  return apiRequest<Wallet>("/wallets", {
    method: "POST",
    body: JSON.stringify(payload),
    auth: true,
  });
}

export function updateWallet(id: string, payload: { name: string }) {
  return apiRequest<Wallet>(`/wallets/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    auth: true,
  });
}

export function deleteWallet(id: string) {
  return apiRequest<{ message: string }>(`/wallets/${id}`, {
    method: "DELETE",
    auth: true,
  });
}

export function getPlans() {
  return apiRequest<Plan[]>("/plans");
}
