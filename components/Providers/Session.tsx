"use client";

import { createContext, useContext, useEffect, useState } from "react";

import type { Session } from "next-auth";
import { getSession } from "@/actions/auth";

interface SessionContextType {
  data: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
}

const SessionContext = createContext<SessionContextType>({
  data: null,
  status: "loading",
});

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");

  useEffect(() => {
    getSession()
      .then((res) => {
        setSession(res);
        setStatus(res ? "authenticated" : "unauthenticated");
      })
      .catch(() => {
        setStatus("unauthenticated");
      });
  }, []);

  return (
    <SessionContext.Provider value={{ data: session, status }}>
      {children}
    </SessionContext.Provider>
  );
};

// 클라이언트 컴포넌트용 커스텀 훅
export const useSession = () => {
  return useContext(SessionContext);
};
