import { HomeWrapper } from "@/components/molecules/home-wrapper";
import { HomePage } from "@/components/molecules/home";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  //const user = await supabase.auth.getUser();

  const supabase = createClient();
  const user = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }
  return (
    <HomeWrapper>
      hello{user.data.user?.email}
      <HomePage />
    </HomeWrapper>
  );
}
