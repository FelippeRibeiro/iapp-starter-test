"use client";

import { IUser, ICreateUser, IUserLogin } from "@/types/UserTypes";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { usePathname, redirect, useRouter } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";

interface IUserContext {
  user: IUser;
  login: (user: IUserLogin) => Promise<void>;
  signup: (user: ICreateUser) => Promise<void>;
  logout: () => void;
  validate: () => Promise<boolean>;
}

const AuthContext = createContext({} as IUserContext);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>({ name: "" });
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token && pathname !== "/auth/login" && pathname !== "/auth/signup") {
      redirect("/auth/login");
    }
  });

  if (user?.name === "") {
    const cookie = Cookies.get("token");
    if (cookie) {
      const tokenUsername: string | JwtPayload | null = jwt.decode(cookie);
      if (tokenUsername) setUser({ name: (tokenUsername as JwtPayload).name });
    }
  }

  const login = async (user: IUserLogin) => {
    const response = await fetch("http://18.228.165.225:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    setUser(data.user);
    Cookies.set("token", data.token);
    router.push("/chat");
  };

  const signup = async (user: ICreateUser) => {
    const response = await fetch("http://18.228.165.225:3000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    setUser(data.user);
    Cookies.set("token", data.token);
    router.push("/chat");
  };

  const logout = () => {
    setUser({ name: "" });
    Cookies.remove("token");
    router.push("/auth/login");
  };

  const validate = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) return false;
      const response = await fetch("http://18.228.165.225:3000/api/user/validate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status == 200) return true;
      else {
        Cookies.remove("token");
        return false;
      }
    } catch (error) {
      Cookies.remove("token");
      return false;
    }
  };

  const values = {
    user,
    login,
    signup,
    logout,
    validate,
  };

  return <AuthContext.Provider value={values}> {children}</AuthContext.Provider>;
};
