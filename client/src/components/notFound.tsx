import Image from "next/image";
export default function NotFound(props: { width: number; height: number }) {
  return (
    <div className="flex flex-col items-center">
      <Image
        width={props.width}
        height={props.height}
        src="/notFound.svg"
        alt="not found image"
      ></Image>
      <h1>Clique na aba lateral esquerda para abrir uma conversa.</h1>
    </div>
  );
}
