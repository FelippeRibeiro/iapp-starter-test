"use client";
import { useAuth } from "@/context/Auth";
import { useState } from "react";

export default function Login() {
  const [document, setDocument] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { signup } = useAuth();

  function handleSignup() {
    signup({ name, document, password });
    setDocument("");
    setPassword("");
  }

  return (
    <div className="flex flex-col items-center w-screen h-screen gap-3">
      <h1 className="font-mono mt-8">IAPP ChatApp Register</h1>
      <div className="flex flex-col gap-3 m-auto border p-10 rounded-md ">
        <label htmlFor="">Nome</label>
        <input
          type="text"
          placeholder="Insira seu Nome"
          className="input"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSignup();
            }
          }}
        />
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
              handleSignup();
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
              handleSignup();
            }
          }}
        />
        <div>
          <button className="btn cursor-pointer" onClick={handleSignup}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
