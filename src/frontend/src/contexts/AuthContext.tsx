import { createContext, useContext, useEffect, useState } from "react";

// 👇 Change this to the actual admin phone number (digits only, no +91)
const ADMIN_PHONE = "9999999999";

export type UserRole = "user" | "driver" | "admin";

export interface AuthUser {
  phone: string;
  role: UserRole;
  name?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  setUserFromLogin: (phone: string, tab: "rider" | "driver") => void;
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

  const setUserFromLogin = (phone: string, tab: "rider" | "driver") => {
    const digits = phone.replace(/\D/g, "");
    let role: UserRole = "user";
    if (digits === ADMIN_PHONE) {
      role = "admin";
    } else if (tab === "driver") {
      role = "driver";
    }
    const newUser: AuthUser = { phone: digits, role };
    setUser(newUser);
    localStorage.setItem("pitthu-auth-user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("pitthu-auth-user");
    try {
      (window as any).firebase?.auth().signOut();
    } catch (_) {}
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
