import { memo, useEffect, useState } from "react";
import { Question, useStudies } from "../providers/space-provider";
import { Button } from "../ui/button";
import Heading from "../ui/heading";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { generateQuestions } from "@/lib/axios";
import { Skeleton } from "../ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

function Questions() {
  const { studies, loading, selectedTeam, reloadSpaces } = useStudies();
  const [loadingQuestions, setLoadingQuestions] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    if (selectedTeam?.id && !selectedTeam.questions && !loadingQuestions) {
      setLoadingQuestions(true);
      toast({
        title: "Almost there!",
        description:
          "System is generating questions based on your study. Please wait a moment! It usually takes up to 20 seconds.",
        duration: 10000,
      });
      generateQuestions(selectedTeam.id, selectedTeam.name)
        .then(() => {
          reloadSpaces();
        })
        .finally(() => {
          setLoadingQuestions(false);
        });
    }
  }, [selectedTeam]);

  if (loadingQuestions) {
    return (
      <div className="border p-3 mt-4 rounded">
        {new Array(3).fill(1).map((_, index) => {
          return (
            <Skeleton key={index} className="w-full h-[50px] rounded my-2" />
          );
        })}
      </div>
    );
  }

  return (
    <div className="questions border p-3 mt-4 rounded">
      <Heading className="mb-4">Please answer following questions!</Heading>

      {selectedTeam?.questions &&
        [
          ...(Array.isArray(selectedTeam?.questions)
            ? selectedTeam?.questions
            : selectedTeam?.questions?.questions),
        ]?.map((item: Question, index: number) => {
          return (
            <div key={index} className="space-y-2 mb-2">
              <Label htmlFor="name">{item.label}</Label>
              <Input id="name" />
            </div>
          );
        })}

      <Button className="mt-3">Submit answers</Button>
    </div>
  );
}

export default memo(Questions);
