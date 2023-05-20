"use client";
import io, { Socket } from "socket.io-client";
import { useState, useEffect } from "react";
import { DefaultEventsMap } from "@socket.io/component-emitter";
let socket: Socket<DefaultEventsMap, DefaultEventsMap>;
export default function Chat() {
  const [status, setStatus] = useState<boolean>(false);
  const [connected, setConnected] = useState<string[]>([]);

  useEffect(() => {
    initSocket();
  }, []);

  async function initSocket() {
    socket = io("http://localhost:3000", { transports: ["websocket"] });
    socket.on("connect", () => {
      setStatus(true);
    });
    socket.on("disconnect", () => {
      setStatus(false);
    });
    socket.on("refreshConnection", (conections) => {
      console.log(conections);
      setConnected(conections);
    });
  }
  function sendMessage(to: string, message: string) {
    socket.emit("direct", { id: "....", to, message });
  }
  return (
    <div className="">
      <div>Status: {status === true ? "Conectado" : "Desconectado"}</div>
      {connected.length &&
        connected.map((el, i) => {
          return (
            <div
              onClick={(e) => {
                sendMessage(el, "oi");
              }}
              key={i}
            >
              {el}
            </div>
          );
        })}
    </div>
  );
}
