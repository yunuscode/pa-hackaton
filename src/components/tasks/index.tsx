import { useStudies } from "../providers/space-provider";
import Heading from "../ui/heading";
import TableData from "./table";

export default function TasksList() {
  const { selectedTeam } = useStudies();

  return (
    <div className="tasks border p-3 rounded">
      <Heading>Tasks board</Heading>
      {selectedTeam?.plan?.sections?.map((item, index) => {
        return (
          <div key={index} className="mt-4">
            <TableData data={item} />
          </div>
        );
      })}
    </div>
  );
}
