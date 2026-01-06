import type { AuthError, Session } from "@supabase/supabase-js";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";
import type { UserType } from "../schemas/userSchema";
import { supabase } from "../services/supabase";
import type { AuthStateInterface } from "../types/auth";

interface AuthContextProps {
  authState: AuthStateInterface;
  loading: boolean;
  logInSupabase: (user: UserType) => Promise<AuthError | undefined>;
  logOutSupabase: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [authState, setAuthState] = useState<AuthStateInterface>({
    user: {
      id: undefined,
      email: undefined,
    },
    error: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const formatSessiontoState = (session: Session | null) => {
      if (session?.user) {
        setAuthState({
          user: {
            id: session?.user.id,
            email: session?.user.email,
          },
          error: null,
        });
      } else {
        setAuthState({
          user: {
            email: undefined,
            id: undefined,
          },
          error: null,
        });
      }

      setLoading(false);
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      formatSessiontoState(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      formatSessiontoState(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const logInSupabase = async (user: UserType) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });

    if (error) {
      return error;
    }

    return;
  };

  const logOutSupabase = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ authState, logInSupabase, logOutSupabase, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("O useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
};
