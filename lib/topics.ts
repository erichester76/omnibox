// lib/topics.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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
  id: string; // Unique ID for the topic
  messages: Communication[];
  people: Set<string>;
  timeRange: { start: Date; end: Date };
  relevanceScore: number;
  lastUpdated: Date;
}

export async function fetchAndGroupTopics(userId: string): Promise<Topic[]> {
  // Fetch all communications for the user
  const { data: messages, error } = await supabase
    .from('communications')
    .select('*')
    .eq('user_id', userId)
    .order('timestamp', { ascending: false });

  if (error) {
    console.error('Error fetching communications:', error);
    return [];
  }

  // Group messages into topics
  const topics: Topic[] = [];
  const messageGroups: Communication[][] = [];

  // Simple grouping: cluster by people and time proximity
  messages.forEach((message: Communication) => {
    const messageTime = new Date(message.timestamp);
    const people = new Set([message.sender, message.recipient]);

    // Try to find an existing group
    let foundGroup = false;
    for (const group of messageGroups) {
      const firstMessage = group[0];
      const firstMessageTime = new Date(firstMessage.timestamp);
      const timeDiff = Math.abs(messageTime.getTime() - firstMessageTime.getTime());
      const timeThreshold = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      const groupPeople = new Set([firstMessage.sender, firstMessage.recipient]);
      const hasCommonPeople = Array.from(people).some(p => groupPeople.has(p));

      if (hasCommonPeople && timeDiff < timeThreshold) {
        group.push(message);
        foundGroup = true;
        break;
      }
    }

    if (!foundGroup) {
      messageGroups.push([message]);
    }
  });

  // Convert groups into topics
  messageGroups.forEach((group, index) => {
    const people = new Set<string>();
    group.forEach(msg => {
      people.add(msg.sender);
      people.add(msg.recipient);
    });

    const timestamps = group.map(msg => new Date(msg.timestamp));
    const timeRange = {
      start: new Date(Math.min(...timestamps.map(t => t.getTime()))),
      end: new Date(Math.max(...timestamps.map(t => t.getTime()))),
    };

    // Compute relevance score (simplified for now)
    const lastUpdated = timeRange.end;
    const now = new Date();
    const timeSinceLastUpdate = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60); // Hours since last update
    const baseScore = 100 - timeSinceLastUpdate; // Higher score for more recent updates

    // Adjust score based on metadata (e.g., upcoming events or tasks)
    let relevanceScore = baseScore;
    group.forEach(msg => {
      if (msg.metadata?.task_due) {
        const dueDate = new Date(msg.metadata.task_due);
        const timeUntilDue = (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60); // Hours until due
        if (timeUntilDue > 0 && timeUntilDue < 24) {
          relevanceScore += 50; // Boost for tasks due soon
        }
      }
      if (msg.metadata?.event_id) {
        // Placeholder: Add logic to check event timing if you have an events table
        relevanceScore += 20; // Boost for event-related messages
      }
    });

    topics.push({
      id: `topic-${index}`,
      messages: group,
      people,
      timeRange,
      relevanceScore,
      lastUpdated,
    });
  });

  // Sort topics by relevance score
  topics.sort((a, b) => b.relevanceScore - a.relevanceScore);

  return topics;
}