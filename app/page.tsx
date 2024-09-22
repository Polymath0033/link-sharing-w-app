import { HomeWrapper } from "@/components/molecules/home-wrapper";
import { HomePage } from "@/components/molecules/home";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { UserData } from "@/types/user-data";

export default async function Home() {
  //const user = await supabase.auth.getUser();

  const supabase = createClient();
  const user = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }
  const id = user.data.user?.id;
  if (id) {
    const { data, error } = await supabase
      .from("user")
      .select("*")
      .eq("user_id", user.data.user?.id);
    if (error) {
      console.error(error);
      throw error;
    }
    const userData: UserData = data;
    if (!userData[0]) {
      redirect("/profile-details");
    } else if (userData[0]) {
      if (
        userData[0]?.first_name.length < 1 &&
        userData[0]?.last_name.length < 1
      ) {
        redirect("/profile-details");
      }
    }
  }

  return (
    <HomeWrapper>
      <HomePage />
    </HomeWrapper>
  );
}
