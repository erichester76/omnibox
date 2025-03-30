// components/Sidebar.tsx
'use client';

import { User } from '@supabase/supabase-js';

interface SidebarProps {
  user: User;
}

export default function Sidebar({ user }: SidebarProps) {
    return (
      <div className="w-48 bg-white dark:bg-gray-800 shadow-lg flex flex-col">
        <ul className="p-2">
          <li className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-900 dark:text-gray-100">
            All
          </li>
          <li className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-900 dark:text-gray-100">
            Email
          </li>
          <li className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-900 dark:text-gray-100">
            Slack
          </li>
        </ul>
        <div className="mt-auto p-2 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">Logged in as:</p>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{user.email}</p>
        </div>
      </div>
    );
  }