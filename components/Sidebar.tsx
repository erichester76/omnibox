// components/Sidebar.tsx
'use client';

import { User } from '@supabase/supabase-js';

interface SidebarProps {
  user: User;
}

export default function Sidebar({ user }: SidebarProps) {
  return (
    <div className="w-48 bg-white shadow-lg flex flex-col">
      <ul className="p-2">
        <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">All</li>
        <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Email</li>
        <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Slack</li>
      </ul>
      <div className="mt-auto p-2 border-t">
        <p className="text-sm text-gray-600">Logged in as:</p>
        <p className="text-sm font-semibold">{user.email}</p>
      </div>
    </div>
  );
}