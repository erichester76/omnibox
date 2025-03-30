import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import InboxLayout from '@/components/InboxLayout';
import { fetchAndGroupTopics } from '@/lib/topics';

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const topics = await fetchAndGroupTopics(user.id);

  return (
   <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <InboxLayout user={user} topics={topics} />
    </div>
  );
}
