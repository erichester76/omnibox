// components/Sidebar.tsx
'use client';

import { User } from '@supabase/supabase-js';

interface Communication {
  id: string;
  user_id: string;
  type: string;
  source: string;
  sender: string;
  recipient: string;
  timestamp: string;
  content: string;
  tags: string[];
  metadata: { event_id?: string; task_due?: string };
}

interface Topic {
  id: string;
  messages: Communication[];
  people: Set<string>;
  timeRange: { start: Date; end: Date };
  relevanceScore: number;
  lastUpdated: Date;
}

interface SidebarProps {
  user: User;
  topics: Topic[];
}

export default function Sidebar({ user, topics }: SidebarProps) {
  return (
    <div className="w-48 bg-white dark:bg-gray-800 shadow-lg flex flex-col">
      <div className="p-2 overflow-y-auto flex-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Topics</h3>
        {topics.length === 0 ? (
          <p className="text-sm text-gray-600 dark:text-gray-400">No topics available</p>
        ) : (
          topics.map(topic => {
            const latestMessage = topic.messages[0]; // Most recent message
            return (
              <div
                key={topic.id}
                className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {Array.from(topic.people).join(', ')}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                  {latestMessage.content}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {new Date(latestMessage.timestamp).toLocaleString()}
                </p>
              </div>
            );
          })
        )}
      </div>
      <div className="mt-auto p-2 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400">Logged in as:</p>
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{user.email}</p>
      </div>
    </div>
  );
}