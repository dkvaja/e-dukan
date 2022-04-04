import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

export const useAuth = () => {
  const userLocal = JSON.parse(localStorage?.getItem("auth")) || "";
  const [user, setUser] = useState(userLocal);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser && firebaseUser.emailVerified) {
        localStorage?.setItem("auth", JSON.stringify(firebaseUser));
        setUser({ ...firebaseUser });
        setIsLoading(false);
      } else {
        localStorage?.removeItem("auth");
        setUser(null);
        setIsLoading(false);
      }
    });
    return unsubscribe;
  }, []);
  return { user, isLoading };
};
