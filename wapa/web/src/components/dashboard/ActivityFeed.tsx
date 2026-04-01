import type { ChatMessage } from '../../types';

function formatTime(timestamp: string) {
  return new Date(timestamp).toLocaleTimeString('en-NG', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-xl px-3 py-2 ${
          isUser
            ? 'bg-[#dcf8c6] rounded-tr-none'
            : 'bg-white border border-gray-200 rounded-tl-none'
        }`}
      >
        {!isUser && (
          <p className="text-xs font-semibold text-green-700 mb-0.5">WAPA</p>
        )}
        <p className="text-sm text-gray-800 whitespace-pre-wrap">{message.content}</p>
        <p className={`text-[10px] mt-1 text-right ${isUser ? 'text-gray-500' : 'text-gray-400'}`}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
}

export function ActivityFeed({ messages }: { messages: ChatMessage[] }) {
  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 flex flex-col">
      <div className="px-4 py-3 border-b border-gray-200 bg-white rounded-t-xl">
        <h3 className="text-sm font-bold text-gray-900">Recent Activity</h3>
      </div>
      <div className="flex-1 max-h-80 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">No recent activity</p>
        ) : (
          messages.map((msg) => <ChatBubble key={msg.id} message={msg} />)
        )}
      </div>
    </div>
  );
}
