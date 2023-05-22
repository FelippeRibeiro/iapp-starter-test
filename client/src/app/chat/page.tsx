"use client";
import io, { Socket } from "socket.io-client";
import { useState, useEffect } from "react";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import Image from "next/image";
import PrivateChat from "@/components/privatechat";
let socket: Socket<DefaultEventsMap, DefaultEventsMap>;
export default function Chat() {
  const [status, setStatus] = useState<boolean>(false);
  const [connected, setConnected] = useState<string[]>([]);
  const [chat, setChat] = useState<React.ReactNode | undefined>();

  useEffect(() => {
    initSocket();
  }, []);

  async function initSocket() {
    socket = io("http://localhost:3000?name=FelipeReact", {
      transports: ["websocket"],
    });
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

  return (
    <div className="flex h-full">
      <div className="border border-white w-1/4 flex flex-col p-2 overflow-y-scroll">
        <div className="text-green-400 border-b">
          Status: {status === true ? "Conectado" : "Desconectado"}
        </div>
        <div className="p-3 pt-0">
          <h3 className="pb-2">Pessoas disponiveis:</h3>

          {connected.length &&
            connected.map((el, i) => {
              return (
                <div
                  className="mt-2 border-b hover:border-green-400"
                  onClick={(e) => {
                    setChat(<PrivateChat name={el} key={el} socket={socket} />);
                  }}
                  key={i}
                >
                  ° {el}
                </div>
              );
            })}
        </div>
      </div>
      <div className="border border-white w-full h-full flex flex-col justify-center items-center">
        {chat || (
          <div className="flex flex-col items-center">
            <Image width={1000} height={1000} src="/notFound.svg" alt="not found image"></Image>
            <h1>Clique na aba lateral esquerda para abrir uma conversa.</h1>
          </div>
        )}
      </div>
    </div>
  );
}
