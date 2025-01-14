"use client";
import React from "react";
import { SessionProvider, SessionProviderProps } from "next-auth/react";
export default function AuthProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
    </>
  );
}
