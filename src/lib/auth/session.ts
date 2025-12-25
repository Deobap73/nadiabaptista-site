// src\lib\auth\session.ts

import { SessionOptions } from 'iron-session';

export type SessionData = {
  userId?: string;
  role?: 'ADMIN' | 'CLIENT';
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: 'nb_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};
