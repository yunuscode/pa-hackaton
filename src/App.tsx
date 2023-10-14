import { ThemeProvider } from "./components/providers/theme-provider";
import RouterComponent from "./components/providers/router-provider";
import AuthProvider from "./components/providers/auth-provider";
import StudiesProvider from "./components/providers/space-provider";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <StudiesProvider>
          <RouterComponent />
        </StudiesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
