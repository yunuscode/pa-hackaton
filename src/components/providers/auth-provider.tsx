import React, { useEffect, useState, useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import supabase from "@/config/supabase";
import { User } from "@supabase/supabase-js";
import { Button } from "../ui/button";
type AuthContextType = {
  user?: User | null;
  setUser?: any;
};

const AuthContext = React.createContext<AuthContextType>({});

export default function AuthProvider({ children }: { children: any }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(true);

  useEffect(() => {
    async function initUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    }
    initUser().finally(() => {
      setPageLoading(false);
    });
  }, []);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });
      console.log(data, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Dialog open={!user}>
        <DialogContent>
          <DialogHeader>
            {!pageLoading && !user ? (
              <>
                <DialogTitle>Unleash Your Potential with LearnX!</DialogTitle>
                <DialogDescription>
                  <div className="flex flex-col mt-3">
                    <p>
                      Welcome to a revolutionary learning experience! LearnX is
                      your personalized study companion, designed to empower you
                      on your journey to mastery, whether it's acing a Hackathon
                      or conquering any learning challenge. Say goodbye to study
                      woes and hello to a brighter, more efficient way to learn.
                    </p>
                    <p className="mt-2 font-semibold text-xl text-black">
                      Key Features:
                    </p>
                    <p className="mt-2">
                      <strong>Tailored Study Plans:</strong> Our AI generates
                      customized study roadmaps, ensuring that you're on the
                      right path to success. No more uncertainty or aimless
                      studying.
                    </p>
                    <p className="mt-2">
                      <strong>Personalized Questions:</strong> We understand
                      your unique needs. LearnX formulates questions that target
                      your strengths and areas of improvement.
                    </p>
                    <p className="mt-2">
                      <strong>Collaborative Learning: </strong> Team up with
                      friends and classmates. Share your study plans, progress,
                      and resources, transforming the learning experience into a
                      collaborative adventure.
                    </p>
                    <Button
                      className="mt-4"
                      disabled={loading}
                      onClick={() => handleGoogleSignIn()}
                    >
                      {loading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {loading ? "Signing in" : "Google sign-in"}
                    </Button>
                  </div>
                </DialogDescription>
              </>
            ) : (
              <div className="flex justify-center items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </div>
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {!pageLoading && user && children}
    </AuthContext.Provider>
  );
}

export function useUser() {
  const context = useContext(AuthContext);

  return context;
}
