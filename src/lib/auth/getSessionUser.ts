// src/lib/auth/getSessionUser.ts

export type SessionUser = {
  isAuthenticated: boolean;
  role: 'admin' | 'user';
};

export function getSessionUserFromCookieString(): SessionUser | null {
  // This helper must not be used to grant access based on client visible cookies.
  // Use server side verifySession for protected routes, and use /api/auth/me for UI state.
  return null;
}
