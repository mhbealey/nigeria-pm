export type ReadStatus = 'sent' | 'delivered' | 'read';
export type MessageDirection = 'in' | 'out';

export interface ChatMessage {
  id: string;
  content: string;
  direction: MessageDirection;
  timestamp: string;
  readStatus: ReadStatus;
  senderName?: string;
  senderAvatar?: string;
  quickReplies?: string[];
  isSystem?: boolean;
}

export interface Chat {
  id: string;
  name: string;
  avatar?: string;
  isGroup: boolean;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
  members?: string[];
}
