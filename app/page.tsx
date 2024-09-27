import { ProgressBar } from "@/components/atoms/progress-bar";
import { HomeWrapper } from "@/components/molecules/home-wrapper";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Home() {
  //const user = await supabase.auth.getUser();

  const supabase = createClient();
  const user = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <Suspense fallback={<Loading />}>
      <HomeWrapper />
    </Suspense>
  );
}
