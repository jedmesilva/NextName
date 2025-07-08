import { useState } from 'react';
import { Paperclip, ArrowUp, Plus } from 'lucide-react';

export default function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl border-t bg-input-solid border-medium-gray">
        <div className="max-w-4xl mx-auto px-4 py-4">
          {/* Input */}
          <div className="mb-4">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your brand name to analyze availability..."
              className="w-full focus:outline-none text-cream placeholder-cream-muted text-base border-0 bg-transparent custom-cursor resize-none min-h-[1.5rem] max-h-32 overflow-y-auto custom-textarea"
              rows={1}
              style={{ 
                height: 'auto',
                minHeight: '1.5rem'
              }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button className="w-9 h-9 rounded-full bg-button-gray flex items-center justify-center text-cream hover:bg-medium-gray active:scale-95 transition-all duration-200 focus:outline-none">
                <Plus size={16} />
              </button>
              <button className="w-9 h-9 rounded-full bg-button-gray flex items-center justify-center text-cream hover:bg-medium-gray active:scale-95 transition-all duration-200 focus:outline-none">
                <Paperclip size={16} />
              </button>
            </div>

            <button 
              onClick={handleSendMessage}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 focus:outline-none ${
                message.trim() 
                  ? 'bg-blue-primary text-white hover:scale-110 shadow-blue-glow' 
                  : 'bg-blue-light text-blue-primary opacity-50 cursor-not-allowed'
              }`}
              disabled={!message.trim()}
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .text-cream {
          color: #F8FAFC;
        }
        
        .placeholder-cream-muted::placeholder {
          color: rgba(248, 250, 252, 0.65) !important;
        }
        
        .bg-input-solid {
          background-color: #2F3338;
        }
        
        .bg-medium-gray {
          background-color: rgba(93, 173, 226, 0.1);
        }
        
        .bg-button-gray {
          background-color: rgba(93, 173, 226, 0.2);
        }
        
        .bg-blue-light {
          background-color: rgba(93, 173, 226, 0.2);
        }
        
        .bg-blue-primary {
          background-color: #5DADE2;
        }
        
        .text-blue-primary {
          color: #5DADE2;
        }
        
        .border-medium-gray {
          border-color: rgba(93, 173, 226, 0.15);
        }
        
        .shadow-blue-glow {
          box-shadow: 0 0 20px rgba(93, 173, 226, 0.4);
        }
        
        .custom-cursor {
          caret-color: #5DADE2;
        }
        
        /* Personalização da seleção de texto - Específica para textarea */
        .custom-textarea::selection {
          background-color: rgba(93, 173, 226, 0.4);
          color: #F8FAFC;
        }
        
        .custom-textarea::-moz-selection {
          background-color: rgba(93, 173, 226, 0.4);
          color: #F8FAFC;
        }
        
        /* Remover as "orelhinhas" do redimensionamento */
        .custom-textarea::-webkit-resizer {
          display: none;
        }
        
        /* Personalizar a scrollbar */
        .custom-textarea::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-textarea::-webkit-scrollbar-track {
          background: rgba(248, 250, 252, 0.1);
          border-radius: 4px;
        }
        
        .custom-textarea::-webkit-scrollbar-thumb {
          background: rgba(93, 173, 226, 0.3);
          border-radius: 4px;
        }
        
        .custom-textarea::-webkit-scrollbar-thumb:hover {
          background: rgba(93, 173, 226, 0.5);
        }
      `}</style>
    </>
  );
}