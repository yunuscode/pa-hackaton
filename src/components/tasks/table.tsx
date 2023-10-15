import { Checkbox } from "@/components/ui/checkbox";
import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useStudies } from "../providers/space-provider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "../ui/skeleton";
import { getDescription } from "@/lib/axios";
import Markdown from "react-markdown";
import supabase from "@/config/supabase";

// Accordion.js

export const Subtask = ({ level, title, opened, onClick, id }) => {
  const { selectedTeam, checkboxItem } = useStudies();
  const [description, setDescription] = useState<string | null>("");

  const handleLoadDescription = async () => {
    const { data: d, error } = await supabase
      .from("descriptions")
      .select("*")
      .eq("id", id);
    if (error) {
      return;
    }

    if (d.length) {
      setDescription(d[0].content);
    }

    if (!d.length) {
      const data = await getDescription(selectedTeam.name + ":" + title);
      await supabase
        .from("descriptions")
        .insert({ id: id, content: data.data.data });
      setDescription(data.data.data);
    }
  };

  return (
    <div
      className={`${level == 0 ? "border" : "border border-t-0"} ${
        level == 0 ? "w-full" : "w-[96%]"
      } p-2 rounded flex items-center ml-auto`}
    >
      <Sheet>
        <div className="accordion-wrapper w-full overflow-hidden">
          <div className="flex items-center transition-all [&[data-state=open]>svg]:rotate-180">
            <Checkbox
              onClick={(e) => {
                checkboxItem(id);
              }}
              checked={selectedTeam.completed_items?.includes(id)}
            >
              {title}
            </Checkbox>
            <SheetTrigger
              onClick={(e) => {
                handleLoadDescription();
              }}
              className="ml-3"
            >
              {title}
            </SheetTrigger>
            {level === 0 && (
              <button
                onClick={onClick}
                className={`${opened && "rotate-180"} ml-auto`}
              >
                <ChevronDown
                  className={`h-4 w-4 shrink-0 transition-transform duration-200 `}
                />
              </button>
            )}
          </div>
        </div>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>
              {!description && (
                <>
                  <Skeleton className="w-full h-28 mt-6" />
                  <Skeleton className="w-full h-12 mt-2" />
                  <Skeleton className="w-full h-12 mt-2" />
                  <Skeleton className="w-full h-12 mt-2" />
                  <Skeleton className="w-full h-12 mt-2" />
                </>
              )}
              {description && <Markdown>{description}</Markdown>}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default function TableData({ data }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <Subtask
        level={0}
        id={data?.id}
        title={data?.title}
        opened={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <>
          {data?.sub_sections?.map((i, index) => {
            return (
              <Subtask
                id={i?.id}
                key={index}
                level={1}
                title={i?.title}
                opened={isOpen}
                onClick={() => {}}
              />
            );
          })}
        </>
      )}
    </div>
  );
}
