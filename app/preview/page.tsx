"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const PreviewPage = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/preview") {
      router.replace("/");
    }
  }, [router, pathname]);

  return null;
};

export default PreviewPage;
