// components/TopicPreview.tsx
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

interface TopicPreviewProps {
  topic: Topic;
}

export default function TopicPreview({ topic }: TopicPreviewProps) {
  // Sort messages by timestamp (most recent first)
  const sortedMessages = [...topic.messages].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="flex-1 p-4 bg-white dark:bg-gray-800 overflow-y-auto">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        Topic: {Array.from(topic.people).join(', ')}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Time Range: {topic.timeRange.start.toLocaleString()} - {topic.timeRange.end.toLocaleString()}
      </p>
      <div className="mt-4 space-y-4">
        {sortedMessages.map(message => (
          <div key={message.id} className="border-b border-gray-200 dark:border-gray-700 pb-2">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {message.sender} ({message.type})
            </p>
            <p className="text-gray-700 dark:text-gray-300">{message.content}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              {new Date(message.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}