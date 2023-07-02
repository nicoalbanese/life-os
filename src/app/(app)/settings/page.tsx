import AccountSettings from "@/components/AccountSettings";
import { getUser } from "@/lib/api/users";
import { getSession } from "@/lib/auth/utils";

export default async function Settings() {
  const { session } = await getSession();
  const { user } = await getUser();
  return (
    <main>
      <h2>Settings</h2>
      <AccountSettings session={session} location={user.location} />
    </main>
  );
}
