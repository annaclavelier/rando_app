import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";

interface User {
  pseudo: string;
  email: string;
  nom: string;
  prenom: string;
}

interface AuthContextType {
  auth: User | null;
  setAuth: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<User | null>(null);

  useEffect(() => {
    axios
      .get("/api/current-user", { withCredentials: true })
      .then(res => setAuth(res.data))
      .catch(() => setAuth(null));
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
