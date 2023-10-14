import { ChatList } from "@/components/chat";
import MessagesProvider from "@/components/providers/message-provider";
import { useStudies } from "@/components/providers/space-provider";
import Questions from "@/components/questions";
import TasksList from "@/components/tasks";

export default function App() {
  const { selectedTeam } = useStudies();

  return (
    <section className="container">
      {!selectedTeam?.plan && <Questions />}

      {selectedTeam?.plan && (
        <div className="flex gap-2 mt-4">
          <div className="w-6/12">
            <TasksList />
          </div>
          <div className="w-6/12">
            <MessagesProvider>
              <ChatList />
            </MessagesProvider>
          </div>
        </div>
      )}
    </section>
  );
}
