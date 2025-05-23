import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../FirebaseConfig";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  authError: string | null;
  setUser: (user: User | null) => void;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearAuthError: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const getFirebaseErrorMessage = (code: string) => {
    var message = null;

    switch (code) {
      case "auth/user-not-found":
        message = "User doesn't exist.";

        break;

      case "auth/email-already-exists":
        message = "Email already exist";

        break;

      case "auth/invalid-credential":
        message = "Invalid Credential";

        break;

      case "auth/invalid-email":
        message = "Invalid Email";

        break;

      case "auth/invalid-password":
        message = "Incorrect Password";

        break;

      case "auth/too-many-requests":
        message = "You're exceed the limit. Try again after sometime.";

        break;

      default:
        message = "Something went wrong";

        break;
    }

    return message;
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string) => {
    setAuthError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      const errorMessage = getFirebaseErrorMessage(error.code);
      setAuthError(errorMessage);
    }
  };

  const signIn = async (email: string, password: string) => {
    setAuthError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      const errorMessage = getFirebaseErrorMessage(error.code);
      setAuthError(errorMessage);
    }
  };

  const signOut = async () => {
    setAuthError(null);
    try {
      await firebaseSignOut(auth);
    } catch (error: any) {
      const errorMessage = getFirebaseErrorMessage(error.code);
      setAuthError(errorMessage);
    }
  };
  const clearAuthError = () => setAuthError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        authError,
        signUp,
        signIn,
        signOut,
        clearAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
