import React, { useState, KeyboardEvent, ChangeEvent, useRef, useCallback } from 'react';
import { Paperclip, ArrowUp, Plus } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resetTextareaHeight = (): void => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = '1.5rem'; // altura mínima
    }
  };

  const handleSendMessage = (): void => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      resetTextareaHeight();
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

  const handleFileUpload = useCallback((): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      console.log('Arquivo selecionado no chat:', file.name, 'Tamanho:', file.size, 'Tipo:', file.type);
      
      // Aqui você pode implementar a lógica para processar o arquivo
      // Por exemplo, fazer upload para um servidor ou processar localmente
      
      // Reset do input para permitir selecionar o mesmo arquivo novamente
      e.target.value = '';
    }
  }, []);

  return (
    <>
      <div className="w-full rounded-t-3xl border-t bg-input-solid border-medium-gray">
        <div className="w-full px-4 py-4">
          {/* Input */}
          <div className="mb-4">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter your brand name to analyze availability..."
              className="w-full focus:outline-none text-cream placeholder-cream-muted text-base border-0 bg-transparent custom-cursor resize-none min-h-[1.5rem] max-h-32 overflow-y-auto custom-textarea"
              rows={1}
              style={{ 
                height: 'auto',
                minHeight: '1.5rem'
              }}
              onInput={handleTextareaInput}
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                className="w-9 h-9 rounded-full bg-button-gray flex items-center justify-center text-cream hover:bg-medium-gray active:scale-95 transition-all duration-200 focus:outline-none"
                aria-label="Add attachment"
              >
                <Plus size={16} />
              </button>
              <button 
                className="w-9 h-9 rounded-full bg-button-gray flex items-center justify-center text-cream hover:bg-medium-gray active:scale-95 transition-all duration-200 focus:outline-none"
                onClick={handleFileUpload}
                aria-label="Attach file"
              >
                <Paperclip size={16} />
              </button>
              
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept="image/*,application/pdf,.doc,.docx,.txt,.csv,.xlsx"
                aria-hidden="true"
              />
            </div>

            <button 
              onClick={handleSendMessage}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 focus:outline-none ${
                message.trim() 
                  ? 'bg-blue-primary text-white hover:scale-110 shadow-blue-glow' 
                  : 'bg-blue-light text-blue-primary opacity-50 cursor-not-allowed'
              }`}
              disabled={!message.trim()}
              aria-label="Send message"
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
};

export default ChatInput;