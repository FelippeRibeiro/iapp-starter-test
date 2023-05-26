/* eslint-disable react/no-unescaped-entities */
export default function Bubble({ type, message }: { type: "send" | "recived"; message: string }) {
  return (
    <div className={`msg ${type === "send" ? "send bg-[#07847E]" : "recived bg-[#633BBC]"}`}>
      <cite>
        <p className="text-black">{type === "send" ? "You:" : "Other:"}</p>
      </cite>
      {message}
    </div>
  );
}
