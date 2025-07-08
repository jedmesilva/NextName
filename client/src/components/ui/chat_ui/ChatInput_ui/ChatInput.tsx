import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { Paperclip, ArrowUp, Plus } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState<string>('');

  const handleSendMessage = (): void => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(e.target.value);
  };

  const handleTextareaInput = (e: React.FormEvent<HTMLTextAreaElement>): void => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = 'auto';
    target.style.height = target.scrollHeight + 'px';
  };

  return (
    <div 
      className="rounded-t-3xl border-t px-4 py-4"
      style={{
        backgroundColor: '#2F3338',
        borderColor: 'rgba(93, 173, 226, 0.15)'
      }}
    >
      {/* Input */}
      <div className="mb-4">
        <textarea
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Digite o nome da sua marca para analisar disponibilidade..."
          className="w-full focus:outline-none text-base border-0 bg-transparent resize-none min-h-[1.5rem] max-h-32 overflow-y-auto"
          rows={1}
          style={{ 
            height: 'auto',
            minHeight: '1.5rem',
            color: '#F8FAFC',
            caretColor: '#5DADE2'
          }}
          onInput={handleTextareaInput}
        />
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button 
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 focus:outline-none"
            style={{
              backgroundColor: 'rgba(93, 173, 226, 0.2)',
              color: '#F8FAFC'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(93, 173, 226, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(93, 173, 226, 0.2)';
            }}
          >
            <Plus size={16} />
          </button>
          <button 
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 focus:outline-none"
            style={{
              backgroundColor: 'rgba(93, 173, 226, 0.2)',
              color: '#F8FAFC'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(93, 173, 226, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(93, 173, 226, 0.2)';
            }}
          >
            <Paperclip size={16} />
          </button>
        </div>

        <button 
          onClick={handleSendMessage}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 focus:outline-none"
          disabled={!message.trim()}
          aria-label="Send message"
          style={{
            backgroundColor: message.trim() ? '#5DADE2' : 'rgba(93, 173, 226, 0.2)',
            color: message.trim() ? 'white' : '#5DADE2',
            opacity: message.trim() ? 1 : 0.5,
            cursor: message.trim() ? 'pointer' : 'not-allowed',
            boxShadow: message.trim() ? '0 0 20px rgba(93, 173, 226, 0.4)' : 'none'
          }}
          onMouseEnter={(e) => {
            if (message.trim()) {
              e.currentTarget.style.transform = 'scale(1.1)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;