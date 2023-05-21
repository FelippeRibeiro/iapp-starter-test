/* eslint-disable react/no-unescaped-entities */
export default function Bubble({ type, message }: { type: "send" | "recived"; message: string }) {
  return (
    <div className={`chat chat-${type === "send" ? "end" : "start"}`}>
      <div className="chat-bubble">{message}</div>
    </div>
  );
}
