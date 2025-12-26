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
    const session = readCookieValue('nb_session', cookieString);
    if (!session) return null;

    const roleRaw = readCookieValue('nb_role', cookieString);

    if (roleRaw === 'admin') return { isAuthenticated: true, role: 'admin' };
    return { isAuthenticated: true, role: 'user' };
  } catch {
    return null;
  }
}
