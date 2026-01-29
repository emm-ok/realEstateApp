import { createContext, useContext, useEffect, useState } from "react";
import { api, apiError } from "../lib/api";
import { redirect, usePathname } from "next/navigation";
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
  const pathname = usePathname();

  const fetchUser = async () => {
    try {
      const res = await api.get("/api/auth/me");
      setUser(res.data);
    } catch (err) {
      if (!axios.isAxiosError(err) || err.response?.status !== 401) {
        console.log("Unexpected auth error");
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      await api.post("/api/auth/login", credentials);
      await fetchUser();
    } catch (error) {
      throw apiError(error);
    }
  };

  const register = async (data: RegisterCredentials) => {
    try {
      await api.post("/api/auth/register", data);
      await fetchUser();
    } catch (error) {
      throw apiError(error);
    }
  };

  const logout = async () => {
    await api.post("/api/auth/logout");
    setUser(null);
    redirect("/auth/login");
  }

  useEffect(() => {
    fetchUser();
  }, [pathname])


  // return(
  //   <AuthContext.Provider>{children}</AuthContext.Provider>
  // )
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be within AuthProvider")
    }

    return context;
}
