// src/lib/auth/getSessionUser.ts

export type SessionUser = {
  isAuthenticated: boolean;
  role: 'admin' | 'user';
};

function readCookieValue(name: string, cookieString: string): string | null {
  const parts = cookieString.split(';').map((p) => p.trim());
  const match = parts.find((p) => p.startsWith(`${name}=`));
  if (!match) return null;

  const value = match.slice(name.length + 1);
  return value ? decodeURIComponent(value) : null;
}

export function getSessionUserFromCookieString(cookieString: string): SessionUser | null {
  try {
    const raw = readCookieValue('nb_role', cookieString);
    if (!raw) return null;

    if (raw === 'admin') return { isAuthenticated: true, role: 'admin' };
    if (raw === 'user') return { isAuthenticated: true, role: 'user' };

    return null;
  } catch {
    return null;
  }
}
