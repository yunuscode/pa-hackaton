import { useStudies } from "@/components/providers/space-provider";
import Questions from "@/components/questions";
import TasksList from "@/components/tasks";

export default function App() {
  return (
    <section>
      <Questions />
      <div className="w-8/12">{/* <TasksList /> */}</div>
    </section>
  );
}
