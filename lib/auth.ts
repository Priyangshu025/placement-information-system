import { cookies } from 'next/headers';
import { db } from './db';
import { User, UserRole } from './types';

const SESSION_COOKIE_NAME = 'pis_session_user_id';

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = cookies();
  const userId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!userId) {
    // Default demo user is student-1 for immediate preview
    const defaultUser = db.getUserById('user-student-1');
    return defaultUser || null;
  }

  const user = db.getUserById(userId);
  return user || null;
}

export async function setSessionUserId(userId: string) {
  const cookieStore = cookies();
  cookieStore.set(SESSION_COOKIE_NAME, userId, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    httpOnly: true,
    sameSite: 'lax',
  });
}

export async function clearSession() {
  const cookieStore = cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export function hasPermission(userRole: UserRole, requiredRole: UserRole): boolean {
  if (userRole === 'admin') return true;
  return userRole === requiredRole;
}

