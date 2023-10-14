import { ChatList } from "@/components/chat";
import { useStudies } from "@/components/providers/space-provider";
import Questions from "@/components/questions";
import TasksList from "@/components/tasks";

export default function App() {
  const { selectedTeam } = useStudies();

  return (
    <section className="container">
      {!selectedTeam?.plan?.sections && <Questions />}

      {selectedTeam?.plan?.sections && (
        <div className="flex gap-2 mt-4">
          <div className="w-8/12">
            <TasksList />
          </div>
          <div className="w-4/12">
            <ChatList />
          </div>
        </div>
      )}
    </section>
  );
}
