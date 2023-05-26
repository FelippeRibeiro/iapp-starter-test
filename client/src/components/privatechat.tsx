import { useState, useEffect } from "react";
import Bubble from "./bubble";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { v4 as uuid } from "uuid";

/* eslint-disable react/no-unescaped-entities */
const messageHandles: any[] = [];
export default function PrivateChat({
  name,
  socket,
  me,
}: {
  name: string;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  me: string;
}) {
  const [input_value, setInputValue] = useState("");
  const [messages, setMessages] = useState<React.ReactNode[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    socket.emit("history", { author1: me, author2: name });
    socket.on("direct", (data) => {
      if (data.from != name) return;
      setMessages((prevMessages) => [
        ...prevMessages,
        <Bubble key={uuid()} message={data.message} type="recived" />,
      ]);
    });

    socket.on("resultHistory", (data: any) => {
      const HistoryMessages = data.map((element: any) => {
        return (
          <Bubble
            key={uuid()}
            message={element.message}
            type={element.author === me ? "send" : "recived"}
          />
        );
      });

      setMessages([...HistoryMessages]);
      setLoaded(true);
    });
  }, [me, name, socket]);

  function sendMessage() {
    socket.emit("message", { from: me, to: name, message: input_value });
    setMessages([...messages, <Bubble message={input_value} type="send" key={uuid()} />]);
    setInputValue("");
  }
  return (
    <div className="h-[95%] w-[60%] flex flex-col">
      <h1 className="text-center m-auto">{name}</h1>
      <div
        className="border h-5/6 overflow-y-scroll p-5 flex flex-col justify-items-start"
        id="Mensagens"
        onAnimationEnd={(e) => {
          e.currentTarget.scrollTop = e.currentTarget.scrollHeight;
        }}
      >
        {messages.map((message, index) => {
          return (
            <div className="msg" key={index}>
              {message}
            </div>
          );
        })}
      </div>
      <div className="m-2 grid grid-cols-5 gap-2">
        <div className="col-span-4">
          <input
            type="text"
            className="input w-full"
            value={input_value}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                input_value.length && sendMessage();
              }
            }}
          />
        </div>
        <div className="col-span-1">
          <button
            className="btn w-full font-black "
            onClick={() => {
              input_value.length && sendMessage();
            }}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
