import { useState, useEffect } from "react";
import Bubble from "./bubble";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

/* eslint-disable react/no-unescaped-entities */
const messageHandles: any[] = [];
export default function PrivateChat({
  name,
  socket,
}: {
  name: string;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}) {
  const [input_value, setInputValue] = useState("");
  const [messages, setMessages] = useState<React.ReactNode[]>([]);

  function listenMessages() {
    socket.on("direct", (data) => {
      console.log(data);

      if (data.from != name) return;
      setMessages([
        ...messages,
        <Bubble key={data.message} message={data.message} type="recived" />,
      ]);
    });
  }

  useEffect(() => {
    listenMessages();
  });

  function sendMessage() {
    setMessages([...messages, input_value]);
    socket.emit("message", { from: "Felipe", to: name, message: input_value });
    setMessages([...messages, <Bubble message={input_value} type="send" key={input_value} />]);
    setInputValue("");
  }
  return (
    <div className="h-[95%] w-4/5 flex flex-col">
      <h1 className="text-center m-auto">{name}</h1>
      <div className="border h-5/6 overflow-y-scroll p-5" id="Menssagens">
        {messages.map((message, index) => {
          return <div key={index}>{message}</div>;
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
                sendMessage();
              }
            }}
          />
        </div>
        <div className="col-span-1">
          <button className="btn w-full" onClick={sendMessage}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
