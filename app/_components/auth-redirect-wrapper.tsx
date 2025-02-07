"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function AuthRedirectWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/");
    }
  }, [isSignedIn, router]);

  return <>{children}</>;
}
