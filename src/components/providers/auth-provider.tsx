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
                <DialogTitle>Welcome!</DialogTitle>
                <DialogDescription>
                  Sign in to get access to all features!
                </DialogDescription>
                <Button disabled={loading} onClick={() => handleGoogleSignIn()}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loading ? "Signing in" : "Google sign-in"}
                </Button>
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
