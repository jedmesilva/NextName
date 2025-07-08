import React from 'react';
import { FileText } from 'lucide-react';

interface ChatHeaderProps {
  brandName: string;
  currentStep: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ brandName, currentStep }) => {
  return (
    <div 
      className="p-4 border-b"
      style={{ 
        backgroundColor: '#2F3338',
        borderColor: 'rgba(93, 173, 226, 0.15)'
      }}
    >
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        {/* Informações da marca e etapa */}
        <div className="flex flex-col">
          <div 
            className="font-semibold text-lg"
            style={{ color: '#F8FAFC' }}
          >
            {brandName}
          </div>
          <div 
            className="text-sm"
            style={{ color: 'rgba(248, 250, 252, 0.85)' }}
          >
            {currentStep}
          </div>
        </div>
        
        {/* Botão de docs */}
        <button 
          className="p-2 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
          style={{ 
            backgroundColor: 'rgba(93, 173, 226, 0.2)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(93, 173, 226, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(93, 173, 226, 0.2)';
          }}
          aria-label="Documentation"
        >
          <FileText 
            className="w-5 h-5" 
            style={{ color: '#5DADE2' }}
          />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;