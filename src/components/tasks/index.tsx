import Heading from "../ui/heading";
import TableData from "./table";
import TasksTable, { Subtask } from "./table";

const topics = [];

export default function TasksList() {
  return (
    <div className="tasks border p-3 mt-4 rounded">
      <Heading>Tasks board</Heading>
      <div className="mt-4">
        <TableData />
      </div>
    </div>
  );
}
