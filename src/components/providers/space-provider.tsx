import React, { useEffect, useState, useContext } from "react";
import supabase from "@/config/supabase";

type Study = {
  id: string;
  name: string;
  user_id: string;
};

type StudiesContextType = {
  studies?: Study[] | null;
  setStudies?: any;
  loading?: boolean;
};

const StudiesContext = React.createContext<StudiesContextType>({});

export default function StudiesProvider({ children }: { children: any }) {
  const [studies, setStudies] = React.useState<Study[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
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
      }
    }
    initSpace().finally(() => setLoading(false));
  }, []);

  return (
    <StudiesContext.Provider value={{ studies, setStudies, loading }}>
      {children}
    </StudiesContext.Provider>
  );
}

export function useStudies() {
  const context = useContext(StudiesContext);

  return context;
}
