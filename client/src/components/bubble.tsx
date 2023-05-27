/* eslint-disable react/no-unescaped-entities */
export default function Bubble({
  type,
  message,
  name,
}: {
  type: "send" | "recived";
  message: string;
  name: string;
}) {
  return (
    <div
      className={`msg ${
        type === "send" ? "send bg-[#07847E]" : "recived bg-[#633BBC]"
      } shadow-xl shadow-black`}
    >
      <cite>
        <p className="text-black">{name}:</p>
      </cite>
      {message}
    </div>
  );
}
