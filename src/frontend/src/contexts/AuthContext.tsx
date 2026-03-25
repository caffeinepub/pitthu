import { createContext, useContext, useState } from "react";
import { registerOrLoginUser } from "../lib/userStorage";

export type UserRole = "user" | "driver" | "admin";

export interface AuthUser {
  userId: string;
  phone: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  setUserFromLogin: (
    name: string,
    phone: string,
    tab: "rider" | "driver",
  ) => void;
  logout: () => void;
  isAdmin: boolean;
  isDriver: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem("pitthu-auth-user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const setUserFromLogin = (
    name: string,
    phone: string,
    tab: "rider" | "driver",
  ) => {
    const registered = registerOrLoginUser(name, phone, tab);
    const authUser: AuthUser = {
      userId: registered.userId,
      phone: registered.phone,
      name: registered.name,
      role: registered.role,
    };
    setUser(authUser);
    localStorage.setItem("pitthu-auth-user", JSON.stringify(authUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("pitthu-auth-user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUserFromLogin,
        logout,
        isAdmin: user?.role === "admin",
        isDriver: user?.role === "driver",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
