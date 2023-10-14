import React, { useEffect, useState, useContext } from "react";
import supabase from "@/config/supabase";
import { useUser } from "./auth-provider";
import { useStudies } from "./space-provider";

export type Message = {
  content: string;
  role: string;
  id: string;
};

type MessagesContextType = {
  messages?: Message[];
  setMessages?: any;
};

const MessagesContext = React.createContext<MessagesContextType>({});

export default function MessagesProvider({ children }: { children: any }) {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const { selectedTeam } = useStudies();

  useEffect(() => {
    async function initSpace() {
      const { data: messages, error } = await supabase
        .from("messages")
        .select("*")
        .eq("study_id", selectedTeam.id);

      if (error) {
        return;
      }

      setMessages(messages);
    }

    initSpace();
  }, [selectedTeam]);

  return (
    <MessagesContext.Provider
      value={{
        messages,
        setMessages,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessagesContext);

  return context;
}
