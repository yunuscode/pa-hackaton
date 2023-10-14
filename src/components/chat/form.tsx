import { Button, buttonVariants } from "@/components/ui/button";
import { IconArrowElbow, IconPlus } from "@/components/ui/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

export default function ChatForm() {
  return (
    <form className="mt-auto">
      <div className="relative">
        <input
          className="border w-full resize-none px-4 py-3"
          placeholder="Send message..."
          name="message"
        />
        <div
          className="absolute"
          style={{
            transform: "translate(-50%, 0)",
          }}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type="submit" size="icon">
                  <IconArrowElbow />
                  <span className="sr-only">Send message</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Send message</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </form>
  );
}
