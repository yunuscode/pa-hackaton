import { memo, useEffect, useState } from "react";
import { Question, useStudies } from "../providers/space-provider";
import { Button } from "../ui/button";
import Heading from "../ui/heading";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { generateQuestions, generateSections } from "@/lib/axios";
import { Skeleton } from "../ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

function Questions() {
  const { studies, loading, selectedTeam, reloadSpaces } = useStudies();
  const [loadingQuestions, setLoadingQuestions] = useState<boolean>(false);
  const { toast } = useToast();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (selectedTeam?.id && !selectedTeam.questions && !loadingQuestions) {
      setLoadingQuestions(true);
      toast({
        title: "Almost there!",
        description:
          "System is generating questions based on your study. Please wait a moment! It usually takes up to 20-40 seconds.",
        duration: 20000,
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

  const handleGeneratePlan = async () => {
    if (selectedTeam?.id && data.length && !loadingQuestions) {
      setLoadingQuestions(true);
      toast({
        title: "We are generating plan!",
        description:
          "System is generating plan based on your answers. Please wait a moment! It usually takes up to 40-70 seconds.",
        duration: 20000,
      });
      generateSections(selectedTeam.id, selectedTeam.name, data)
        .then(() => {
          reloadSpaces();
        })
        .finally(() => {
          setLoadingQuestions(false);
        });
    }
  };

  if (loadingQuestions && !selectedTeam?.questions) {
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

  if (loadingQuestions && !selectedTeam?.plan) {
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
        ]
          ?.concat([
            {
              label: "Add your own data",
              id: "want_to_prepare_for_this_jobs_value",
              description: "Could be job post, job description. It is optional",
            },
          ])
          .map((item: Question, index: number) => {
            return (
              <div key={index} className="space-y-2 mb-2">
                <Label htmlFor="name">{item.label}</Label>
                <Input
                  id="name"
                  placeholder={
                    typeof item.description == "string"
                      ? item.description
                      : item.description?.description
                  }
                  onChange={(e) => {
                    let answer = {
                      id: item.id,
                      value: e.target.value,
                    };
                    const index = data.findIndex((i) => i.id == item.id);

                    if (index == -1) {
                      setData([...data, answer]);
                      return;
                    }

                    let res = [...data];

                    res[index] = answer;

                    setData(res);
                  }}
                />
              </div>
            );
          })}

      <Button
        disabled={!data.length}
        onClick={() => handleGeneratePlan()}
        className="mt-3"
      >
        Submit answers
      </Button>
    </div>
  );
}

export default memo(Questions);
