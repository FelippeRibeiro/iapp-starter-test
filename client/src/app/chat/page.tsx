"use client";
import io, { Socket } from "socket.io-client";
import { useState, useEffect } from "react";
import { DefaultEventsMap } from "@socket.io/component-emitter";

//Components
import PrivateChat from "@/components/privatechat";
import NotFound from "@/components/notFound";

import { useAuth } from "@/context/Auth";
import { useRouter } from "next/navigation";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

export default function Chat() {
  const [status, setStatus] = useState<boolean>(false);
  const [connected, setConnected] = useState<string[]>([]);
  const [chat, setChat] = useState<React.ReactNode | undefined>();
  const { user, logout, validate } = useAuth();
  const router = useRouter();

  useEffect(() => {
    validate().then((res) => {
      if (!res) {
        try {
          socket.disconnect();
        } catch (error) {
          console.error(error);
        }
        router.push("/auth/login");
      }
      if (user.name.length > 0) {
        initSocket(user.name);
      }
    });
  }, [user.name, validate, router]);

  async function initSocket(name: string) {
    socket = io(`http://localhost:3000?name=${name}`, {
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      setStatus(true);
    });
    socket.on("disconnect", () => {
      setStatus(false);
    });
    socket.on("refreshConnection", (connections) => {
      setConnected(connections);
    });
  }

  return (
    <div className="flex h-full">
      <div className="border border-white w-1/4 flex flex-col p-2 overflow-y-scroll">
        <div className="text-white border-b">
          Status:{" "}
          {status === true ? (
            <span className="text-green-500">Conectado</span>
          ) : (
            <span className="text-red-500">Desconectado</span>
          )}{" "}
          <br />
          <div
            className="btn btn-xs bg-red-600 mb-2 text-black"
            onClick={() => {
              logout();
              socket.disconnect();
            }}
          >
            Logout
          </div>
        </div>
        <div className="p-3 pt-0">
          <h3 className="pb-2">Pessoas disponiveis:</h3>

          {connected.length &&
            connected.map((el, i) => {
              if (user.name != el) {
                return (
                  <div
                    className="mt-2 border-b hover:border-green-400"
                    onClick={(e) => {
                      setChat(<PrivateChat name={el} key={el} me={user.name} socket={socket} />);
                    }}
                    key={i}
                  >
                    ° {el}
                  </div>
                );
              }
            })}
        </div>
      </div>
      <div className="border border-white w-full h-full flex flex-col justify-center items-center">
        {chat || <NotFound height={1000} width={1000} />}
      </div>
    </div>
  );
}
