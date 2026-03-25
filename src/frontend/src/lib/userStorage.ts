export interface RegisteredUser {
  userId: string;
  name: string;
  phone: string;
  role: "user" | "driver" | "admin";
  createdAt: string;
}

const KEY = "pitthu-users";
const ADMIN_PHONE = "9999999999";

export function getAllUsers(): RegisteredUser[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function findUserByPhone(phone: string): RegisteredUser | null {
  return getAllUsers().find((u) => u.phone === phone) ?? null;
}

function generateUserId(): string {
  return `USR${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export function registerOrLoginUser(
  name: string,
  phone: string,
  tab: "rider" | "driver",
): RegisteredUser {
  const digits = phone.replace(/\D/g, "");
  const existing = findUserByPhone(digits);
  if (existing) {
    if (name && name !== existing.name) {
      const users = getAllUsers().map((u) =>
        u.phone === digits ? { ...u, name } : u,
      );
      localStorage.setItem(KEY, JSON.stringify(users));
      return { ...existing, name };
    }
    return existing;
  }
  const role =
    digits === ADMIN_PHONE ? "admin" : tab === "driver" ? "driver" : "user";
  const newUser: RegisteredUser = {
    userId: generateUserId(),
    name: name || "PITTHU User",
    phone: digits,
    role,
    createdAt: new Date().toISOString(),
  };
  const users = getAllUsers();
  users.push(newUser);
  localStorage.setItem(KEY, JSON.stringify(users));
  return newUser;
}
