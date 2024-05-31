import { useState, useEffect } from "react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

// Define the custom hook function
const useSessionData = () => {
  const { data: session, status } = useSession();
  return session
};

export default useSessionData;
