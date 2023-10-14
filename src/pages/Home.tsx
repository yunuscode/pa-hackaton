import { ChatList } from "@/components/chat";
import MessagesProvider from "@/components/providers/message-provider";
import { useStudies } from "@/components/providers/space-provider";
import Questions from "@/components/questions";
import TasksList from "@/components/tasks";

export default function App() {
  const { selectedTeam } = useStudies();

  return (
    <section className="container sm:pr-8 sm:pl-8 pr-2 pl-2">
      {!selectedTeam?.plan && <Questions />}

      {selectedTeam?.plan && (
        <div className="flex gap-2 mt-4 flex-wrap">
          <div className="sm:w-6/12 w-full">
            <TasksList />
          </div>
          <div className="sm:w-6/12 w-full">
            <MessagesProvider>
              <ChatList />
            </MessagesProvider>
          </div>
        </div>
      )}
    </section>
  );
}
