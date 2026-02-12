"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { api, apiError } from "../lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import { LoginCredentials, RegisterCredentials, User } from "@/types/auth";
import axios from "axios";
import Cookies from "js-cookie";
import { loginUser, registerUser } from "@/lib/auth";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  deleteUser: any;
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
      toast(err?.response?.data?.message)

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    await loginUser(credentials);
    await fetchUser();
  };

  const register = async (data: RegisterCredentials) => {
    await registerUser(data);
  };

  const logout = async () => {
    await api.post("/api/auth/logout");
    setUser(null);
    router.push("/?auth=login");
  };

  const deleteUser = async () => {
    try {
      const res = await api.delete("/api/users/me");
      setUser(null)
      toast(res.data.message)
      router.push("/register");
    } catch (error) {
      apiError(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!loading && user) {
      const redirectTo =
        searchParams.get("redirect") ||
        Cookies.get("redirect_after_login") ||
        "/";
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        deleteUser,
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
