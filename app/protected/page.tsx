import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import InboxLayout from '@/components/InboxLayout';

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
   <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <InboxLayout user={user} />
    </div>
  );
}
