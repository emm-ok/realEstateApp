"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { api, apiError } from "../lib/api";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { LoginCredentials, RegisterCredentials, User } from "@/types/auth";
import axios from "axios";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const res = await api.get("/api/auth/me");
      setUser(res.data.user);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status !== 401) {
          console.error("Auth error:", err.response?.data);
        }
      }

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      await api.post("/api/login", credentials);
      await fetchUser();

      const redirectTo = searchParams.get("redirect") || "/";
      router.push(redirectTo);
    } catch (error) {
      throw apiError(error);
    }
  };

  const register = async (data: RegisterCredentials) => {
    try {
      await api.post("/api/register", data);
      await fetchUser();
    } catch (error) {
      throw apiError(error);
    }
  };

  const logout = async () => {
    await api.post("/api/logout");
    setUser(null);
    router.push("/?auth=login");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be within AuthProvider");
  }

  return context;
};
