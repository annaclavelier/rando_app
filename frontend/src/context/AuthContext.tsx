import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { userService } from "../services/userService";

interface User {
  pseudo: string;
  email: string;
  nom: string;
  prenom: string;
}

interface AuthContextType {
  auth: User | null;
  isAuthenticated: boolean;
  setAuth: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<User | null>(null);

  useEffect(() => {
    async function setUser() {
      try {
        const user: User = await userService.getCurrentUser();
        setAuth(user);
      } catch {
        setAuth(null);
      }
    }

    setUser();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, isAuthenticated: !!auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
