import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

// Accordion.js

export const Subtask = ({ level, title, opened, onClick }) => {
  return (
    <div
      className={`${level == 0 ? "border" : "border border-t-0"} ${
        level == 0 ? "w-full" : "w-[96%]"
      } p-2 rounded flex items-center ml-auto`}
    >
      <div className="accordion-wrapper w-full overflow-hidden">
        <div className="flex items-center transition-all [&[data-state=open]>svg]:rotate-180">
          <Checkbox>{title}</Checkbox>
          <button className="ml-3">{title}</button>
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
    </div>
  );
};

export default function TableData({ data }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <Subtask
        level={0}
        title={data?.title}
        opened={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <>
          {data?.sub_sections?.map((i, index) => {
            return (
              <Subtask
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
