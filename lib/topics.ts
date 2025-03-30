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
  id: string;
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

  // Group by shared context: people, time proximity, tags, and metadata
  messages.forEach((message: Communication) => {
    const messageTime = new Date(message.timestamp);
    const people = new Set([message.sender, message.recipient]);
    const tags = new Set(message.tags || []);
    const eventId = message.metadata?.event_id || null;
    const taskDue = message.metadata?.task_due || null;

    // Try to find an existing group
    let foundGroup = false;
    for (const group of messageGroups) {
      const firstMessage = group[0];
      const firstMessageTime = new Date(firstMessage.timestamp);
      const timeDiff = Math.abs(messageTime.getTime() - firstMessageTime.getTime());
      const timeThreshold = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      const groupPeople = new Set([firstMessage.sender, firstMessage.recipient]);
      const hasCommonPeople = Array.from(people).some(p => groupPeople.has(p));

      const groupTags = new Set(firstMessage.tags || []);
      const hasCommonTags = Array.from(tags).some(t => groupTags.has(t));

      const groupEventId = firstMessage.metadata?.event_id || null;
      const hasCommonEvent = eventId && groupEventId && eventId === groupEventId;

      const groupTaskDue = firstMessage.metadata?.task_due || null;
      const hasCommonTask = taskDue && groupTaskDue && taskDue === groupTaskDue;

      // Group if messages share people AND (time proximity OR common tags OR common event OR common task)
      if (
        hasCommonPeople &&
        (timeDiff < timeThreshold || hasCommonTags || hasCommonEvent || hasCommonTask)
      ) {
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

    const lastUpdated = timeRange.end;
    const now = new Date();
    const timeSinceLastUpdate = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60); // Hours since last update
    let relevanceScore = 100 - timeSinceLastUpdate; // Higher score for more recent updates

    // Adjust score based on metadata
    group.forEach(msg => {
      if (msg.metadata?.task_due) {
        const dueDate = new Date(msg.metadata.task_due);
        const timeUntilDue = (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60); // Hours until due
        if (timeUntilDue > 0 && timeUntilDue < 24) {
          relevanceScore += 50; // Boost for tasks due soon
        }
      }
      if (msg.metadata?.event_id) {
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