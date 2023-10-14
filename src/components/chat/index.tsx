import { useEffect, useRef } from "react";
import { useMessages } from "../providers/message-provider";
import Heading from "../ui/heading";
import { Separator } from "../ui/separator";
import ChatForm from "./form";
import ChatMessage from "./message";

export function ChatList() {
  const { messages } = useMessages();
  const divRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="mx-auto max-w-2xl p-3 border rounded h-[70vh] sticky flex flex-col">
      <Heading className="h-[5%]">Chat with AI tutor</Heading>
      <div ref={divRef} className="h-[88%] overflow-scroll pb-6">
        {messages.map((message, index) => (
          <div key={index}>
            <ChatMessage message={message} />
            {index < messages.length - 1 && <Separator className="my-2" />}
          </div>
        ))}
      </div>
      <ChatForm />
    </div>
  );
}
