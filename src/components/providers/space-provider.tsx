import React, { useEffect, useState, useContext } from "react";
import supabase from "@/config/supabase";
import { useUser } from "./auth-provider";

export type Question = {
  label: string;
  description: string;
  id: string;
};

type Study = {
  id: string;
  name: string;
  user_id: string;
  questions?: any;
};

type StudiesContextType = {
  studies?: Study[] | null;
  setStudies?: any;
  loading?: boolean;
  selectedTeam?: Study;
  setSelectedTeam?: any;
  reloadSpaces?: any;
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
          setSelectedTeam(spaces[0]);
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

  return (
    <StudiesContext.Provider
      value={{
        studies,
        setStudies,
        loading,
        selectedTeam,
        setSelectedTeam,
        reloadSpaces,
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
