"use client";

import { IUser, ICreateUser, IUserLogin } from "@/types/UserTypes";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { usePathname, redirect, useRouter } from "next/navigation";

interface IUserContext {
  user: IUser;
  login: (user: IUserLogin) => Promise<void>;
  signup: (user: ICreateUser) => Promise<void>;
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

  const login = async (user: IUserLogin) => {
    const response = await fetch("http://localhost:3000/api/auth/login", {
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
    const response = await fetch("http://localhost:3000/api/auth/signup", {
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

  const values = {
    user,
    login,
    signup,
  };

  return <AuthContext.Provider value={values}> {children}</AuthContext.Provider>;
};
