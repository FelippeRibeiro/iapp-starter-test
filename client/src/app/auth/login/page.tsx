"use client";
import { useAuth } from "@/context/Auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

export default function Login() {
  const [document, setDocument] = useState("");
  const [password, setPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);
  const { login, valide } = useAuth();
  const router = useRouter();

  useEffect(() => {
    valide().then((status) => {
      if (status) router.push("/chat");
    });
  });

  async function handleLogin() {
    login({ document, password }).catch((err) => {
      setWrongPassword(true);
      return;
    });
    setDocument("");
    setPassword("");
  }

  return (
    <div className="flex flex-col items-center w-screen h-screen gap-3">
      <h1 className="font-mono mt-8">IAPP ChatApp Login</h1>
      <div className="flex flex-col gap-3 m-auto border p-10 rounded-md ">
        <label htmlFor="">CPF</label>
        <input
          type="text"
          placeholder="Insira seu CPF"
          className="input"
          value={document}
          onChange={(e) => {
            setDocument(e.target.value.replaceAll(/[^0-9]/g, ""));
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
        />
        <label htmlFor="">Senha</label>
        <input
          type="password"
          placeholder="Insira sua senha"
          className="input"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
        />
        <div>
          {wrongPassword && (
            <div className="text-red-700 text-center mb-2 show">CPF ou Senha incorretos</div>
          )}
          <button className="btn cursor-pointer w-80" onClick={handleLogin}>
            Login
          </button>
          <div className="mt-5">
            <Link href={"/auth/signup"} className="hover:border-b border-white">
              Não possui uma conta?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
