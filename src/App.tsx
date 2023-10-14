import { ThemeProvider } from "./components/providers/theme-provider";
import RouterComponent from "./components/providers/router-provider";
import AuthProvider from "./components/providers/auth-provider";
import StudiesProvider from "./components/providers/space-provider";
import { Toaster } from "@/components/ui/toaster";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <StudiesProvider>
          <RouterComponent />
          <Toaster />
        </StudiesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
