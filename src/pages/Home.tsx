import { ChatList } from "@/components/chat";
import MessagesProvider from "@/components/providers/message-provider";
import { useStudies } from "@/components/providers/space-provider";
import Questions from "@/components/questions";
import TasksList from "@/components/tasks";
import { Button } from "@/components/ui/button";

export default function App() {
  const { selectedTeam } = useStudies();

  return (
    <section className="container sm:pr-8 sm:pl-8 pr-2 pl-2">
      {!selectedTeam?.plan && <Questions />}

      {selectedTeam?.plan && (
        <div className="flex gap-2 mt-4 sm:flex-nowrap flex-wrap">
          <div className="sm:w-6/12 w-full">
            <TasksList />
          </div>
          <div className="sm:w-6/12 w-full">
            <div className="mb-3 flex gap-4 justify-between">
              <Button className="flex-grow" disabled>
                Complate and Take quiz
              </Button>
              <Button className="flex-grow" disabled>
                Share plan with others
              </Button>
            </div>
            <MessagesProvider>
              <ChatList />
            </MessagesProvider>
          </div>
        </div>
      )}
    </section>
  );
}
