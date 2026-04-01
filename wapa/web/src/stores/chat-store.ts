import { create } from 'zustand';
import type { ChatMessage, Chat } from '../types/message';
import { mockMessages } from '../data/mock-messages';

interface ChatState {
  messages: ChatMessage[];
  chats: Chat[];
  activeChatId: string;
  isTyping: boolean;
  addMessage: (msg: ChatMessage) => void;
  setTyping: (typing: boolean) => void;
  setActiveChat: (chatId: string) => void;
  clearMessages: () => void;
  resetToHistory: (messages: ChatMessage[]) => void;
}

const initialChats: Chat[] = [
  {
    id: 'chat-wapa',
    name: 'WAPA Bot',
    isGroup: false,
    lastMessage: mockMessages[mockMessages.length - 1]?.content ?? '',
    lastMessageTime: mockMessages[mockMessages.length - 1]?.timestamp ?? '',
    unreadCount: 0,
  },
  {
    id: 'chat-team',
    name: 'Website Redesign Team',
    isGroup: true,
    lastMessage: 'Maya: I finished the hero section design',
    lastMessageTime: '2026-03-31T12:00:00Z',
    unreadCount: 3,
    members: ['u-alex', 'u-maya', 'u-jordan', 'u-sam', 'u-riley'],
  },
];

export const useChatStore = create<ChatState>((set) => ({
  messages: [...mockMessages],
  chats: initialChats,
  activeChatId: 'chat-wapa',
  isTyping: false,

  addMessage: (msg) =>
    set((state) => {
      const updatedChats = state.chats.map((chat) =>
        chat.id === state.activeChatId
          ? {
              ...chat,
              lastMessage: msg.content,
              lastMessageTime: msg.timestamp,
              unreadCount:
                msg.direction === 'in'
                  ? chat.unreadCount + 1
                  : chat.unreadCount,
            }
          : chat
      );
      return {
        messages: [...state.messages, msg],
        chats: updatedChats,
      };
    }),

  setTyping: (typing) => set({ isTyping: typing }),

  setActiveChat: (chatId) =>
    set((state) => ({
      activeChatId: chatId,
      chats: state.chats.map((chat) =>
        chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
      ),
    })),

  clearMessages: () => set({ messages: [] }),

  resetToHistory: (messages) => set({ messages }),
}));
