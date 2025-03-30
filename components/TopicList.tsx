// components/TopicList.tsx
'use client';

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

interface TopicListProps {
  topics: Topic[];
  onSelect: (id: string) => void;
}

export default function TopicList({ topics, onSelect }: TopicListProps) {
  return (
    <div className="w-1/3 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      {topics.map(topic => {
        const latestMessage = topic.messages[0]; // Most recent message
        return (
          <div
            key={topic.id}
            className="p-2 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={() => onSelect(topic.id)}
          >
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              {Array.from(topic.people).join(', ')}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {latestMessage.content}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              {new Date(latestMessage.timestamp).toLocaleString()}
            </p>
          </div>
        );
      })}
    </div>
  );
}