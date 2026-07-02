import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/session";
import CreateWizard from "./CreateWizard";

export const dynamic = "force-dynamic";

export default async function CreatePage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  return (
    <CreateWizard
      user={{ name: user.name, emoji: user.emoji, raiseLimit: user.raiseLimit }}
    />
  );
}
