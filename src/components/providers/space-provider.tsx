import React, { useEffect, useState, useContext } from "react";
import supabase from "@/config/supabase";
import { useUser } from "./auth-provider";

export type Question = {
  label: string;
  description: any;
  id: string;
};

type Study = {
  id: string;
  name: string;
  user_id: string;
  questions?: any;
  plan: any;
  completed_items?: string[];
};

type StudiesContextType = {
  studies?: Study[] | null;
  setStudies?: any;
  loading?: boolean;
  selectedTeam?: Study;
  setSelectedTeam?: any;
  reloadSpaces?: any;
  checkboxItem?: any;
};

const StudiesContext = React.createContext<StudiesContextType>({});

export default function StudiesProvider({ children }: { children: any }) {
  const [studies, setStudies] = React.useState<Study[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [selectedTeam, setSelectedTeam] = React.useState<Study>();
  const { user } = useUser();

  useEffect(() => {
    setLoading(true);
    async function initSpace() {
      const { data: spaces, error } = await supabase
        .from("studies")
        .select("*");
      if (error) {
        return;
      }
      if (!spaces.length) {
        setStudies(spaces);
      }

      if (spaces.length) {
        setStudies(spaces);
        if (!selectedTeam) {
          const index = spaces.findIndex(
            (i) => i.id == window.localStorage.getItem("studyId")
          );
          if (index > -1) {
            setSelectedTeam(spaces[index]);
          } else {
            setSelectedTeam(spaces[0]);
          }
        }
      }
    }
    initSpace().finally(() => setLoading(false));
  }, []);

  const reloadSpaces = async () => {
    const { data: spaces, error } = await supabase.from("studies").select("*");
    if (error) {
      return;
    }
    if (spaces.length) {
      setStudies(spaces);
      setSelectedTeam(spaces[spaces.length - 1]);
    }
  };

  const checkboxItem = async (id: string) => {
    let completed_items = selectedTeam.completed_items || [];
    completed_items.push(id);
    const { error } = await supabase
      .from("studies")
      .update({ completed_items })
      .eq("id", selectedTeam.id);

    if (error) {
      return;
    }

    let stds = [...studies];
    let index = stds.findIndex((i) => i.id == selectedTeam.id);
    stds[index] = { ...stds[index], completed_items };

    setStudies(stds);
  };

  return (
    <StudiesContext.Provider
      value={{
        studies,
        setStudies,
        loading,
        selectedTeam,
        setSelectedTeam,
        reloadSpaces,
        checkboxItem,
      }}
    >
      {children}
    </StudiesContext.Provider>
  );
}

export function useStudies() {
  const context = useContext(StudiesContext);

  return context;
}
