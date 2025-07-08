import React from 'react';
import { FileText } from 'lucide-react';

interface ChatHeaderProps {
  brandName: string;
  currentStep: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ brandName, currentStep }) => {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 p-4 bg-header-solid border-b border-header-border">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          {/* Informações da marca e etapa */}
          <div className="flex flex-col">
            <div className="text-cream font-semibold text-lg">
              {brandName}
            </div>
            <div className="text-cream-muted text-sm">
              {currentStep}
            </div>
          </div>
          
          {/* Botão de docs */}
          <button 
            className="p-2 rounded-xl bg-blue-light hover:bg-blue-hover transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
            aria-label="Documentation"
          >
            <FileText className="w-5 h-5 text-blue-primary" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .text-cream {
          color: #F8FAFC;
        }
        
        .text-cream-muted {
          color: rgba(248, 250, 252, 0.85);
        }
        
        .bg-header-solid {
          background-color: #2F3338;
        }
        
        .border-header-border {
          border-color: rgba(93, 173, 226, 0.15);
        }
        
        .bg-blue-light {
          background-color: rgba(93, 173, 226, 0.2);
        }
        
        .bg-blue-hover {
          background-color: rgba(93, 173, 226, 0.3);
        }
        
        .text-blue-primary {
          color: #5DADE2;
        }
      `}</style>
    </>
  );
};

export default ChatHeader;