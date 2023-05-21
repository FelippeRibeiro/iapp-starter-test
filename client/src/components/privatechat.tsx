import { useState } from "react";

/* eslint-disable react/no-unescaped-entities */
export default function PrivateChat({ name }: { name: string }) {
  const [input_value, setInputValue] = useState("");

  return (
    <div className="h-[95%] w-4/5 flex flex-col">
      <h1 className="text-center m-auto">{name}</h1>
      <div className="border h-5/6 overflow-y-scroll"></div>
      <div className="m-2 grid grid-cols-5 gap-2">
        <div className="col-span-4">
          <input
            type="text"
            className="input w-full"
            value={input_value}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
        </div>
        <div className="col-span-1">
          <button className="btn w-full">Enviar</button>
        </div>
      </div>
    </div>
  );
}
