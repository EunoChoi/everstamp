import { useSession } from "next-auth/react";

export function getCurrentUserEmail() {
  const { data: session } = useSession();
  const email = session?.user?.email ? session?.user?.email : '';
  return email;
}