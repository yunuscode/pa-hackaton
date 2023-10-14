import Heading from "../ui/heading";
import { Separator } from "../ui/separator";
import ChatForm from "./form";

export function ChatList() {
  return (
    <div className="mx-auto max-w-2xl p-3 border rounded h-[70vh] sticky flex flex-col">
      <Heading>Chat with AI tutor</Heading>
      {[].map((message, index) => (
        <div key={index}>
          {/* <ChatMessage message={message} /> */}
          {index < [].length - 1 && <Separator className="my-4 md:my-8" />}
        </div>
      ))}
      <ChatForm />
    </div>
  );
}
