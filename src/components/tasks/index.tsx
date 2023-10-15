import { useStudies } from "../providers/space-provider";
import Heading from "../ui/heading";
import { Separator } from "../ui/separator";
import TableData from "./table";

export default function TasksList() {
  const { selectedTeam } = useStudies();

  console.log(selectedTeam?.plan);

  return (
    <div className="tasks border p-3 rounded">
      <Heading>Tasks board</Heading>
      <div key={Math.random()} className="mt-4">
        <TableData
          data={{
            id: Math.random(),
            title: "Tap to add your content...",
            sub_sections: [
              {
                id: Math.random(),
                title: "Tap to add your sub task...",
              },
            ],
          }}
        />
      </div>
      {selectedTeam?.plan?.map((item, index) => {
        return (
          <div key={index} className="mt-4">
            <TableData data={item} />
          </div>
        );
      })}
    </div>
  );
}
