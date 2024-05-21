import { useState, useEffect } from "react";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

// Define the custom hook function
const useSessionData = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      setSession(session);
    };

    fetchData();
  }, []);

  return session;
};

export default useSessionData;
