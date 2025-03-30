// components/InboxLayout.tsx
'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Toolbar from '@/components/Toolbar';
import TopicList from '@/components/TopicList';
import TopicPreview from '@/components/TopicPreview';
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

interface InboxLayoutProps {
  user: User;
  topics: Topic[];
}

export default function InboxLayout({ user, topics }: InboxLayoutProps) {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar user={user} />
        <div className="flex-1 flex overflow-hidden">
          <TopicList topics={topics} onSelect={setSelectedTopic} />
          {selectedTopic && (
            <TopicPreview topic={topics.find(t => t.id === selectedTopic)!} />
          )}
        </div>
      </div>
    </div>
  );
}