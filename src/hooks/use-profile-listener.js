import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { listenToMyProfile } from "../services/listeners";

export const useProfile = () => {
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const listener = listenToMyProfile((myProfile) => {
      setProfile(myProfile);
      setLoading(false);
    });
    return () => listener && listener();
  }, [auth]);

  return { profile, loading };
};
