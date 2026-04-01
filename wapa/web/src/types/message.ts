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
  /** If this message triggered a board sync, the sync event details */
  syncAction?: {
    type: 'move' | 'create' | 'update';
    cardTitle: string;
    fromColumn?: string;
    toColumn: string;
  };
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
