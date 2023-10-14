import { Button } from "@/components/ui/button";
import { IconArrowElbow } from "@/components/ui/icons";
import { Input } from "../ui/input";
import { getResponseFromChat } from "@/lib/axios";
import { useStudies } from "../providers/space-provider";
import { useMessages } from "../providers/message-provider";

export default function ChatForm() {
  const { selectedTeam } = useStudies();
  const { setMessages, messages } = useMessages();

  const handleForm = async (e) => {
    e.preventDefault();

    const value = e.target[0].value;

    const message = {
      content: value,
      role: "user",
      id: Math.random().toString(),
    };

    const loadingMessage = {
      content: "AI is responding...",
      role: "assistant",
      id: Math.random().toString(),
    };

    setMessages([...messages, message, loadingMessage]);

    e.target.reset();

    const res = await getResponseFromChat(
      selectedTeam.id,
      selectedTeam.name,
      value
    );

    const aiResponse = {
      content: res.data.answer[0].content,
      role: "assistant",
      id: res.data.answer[0].id,
    };

    setMessages([...messages, message, aiResponse]);
  };

  return (
    <form onSubmit={handleForm} className="mt-auto h-[7%] w-[90%] ml-auto">
      <div className="flex items-center gap-2 h-10">
        <Input
          className="border rounded w-full resize-none"
          placeholder="Send message..."
          name="message"
          minLength={10}
        />
        <Button type="submit" className="h-full" size="icon">
          <IconArrowElbow />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </form>
  );
}
