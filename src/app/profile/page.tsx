import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/session";

export default async function MyProfile() {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  redirect(`/profile/${user.handle}`);
}
