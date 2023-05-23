/* eslint-disable react/no-unescaped-entities */
export default function Bubble({ type, message }: { type: "send" | "recived"; message: string }) {
  return (
    <div id={`${type === "send" ? "send" : "recived"}`}>
      <cite>
        <p className="text-gray-500">{type === "send" ? "You:" : "Other:"}</p>
      </cite>
      {message}
    </div>
  );
}
