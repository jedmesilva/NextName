import { Menu, MessageCircle, FileText } from 'lucide-react';

interface NavbarProps {
  activeView?: 'chat' | 'content';
  onViewChange?: (view: 'chat' | 'content') => void;
  showMobileToggle?: boolean;
}

export default function Navbar({ activeView = 'chat', onViewChange, showMobileToggle = false }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-header-solid border-b border-header-border">
      <div className="max-w-full px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            className="p-2 rounded-xl bg-blue-light hover:bg-blue-hover transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
            aria-label="Menu"
          >
            <Menu className="w-5 h-5 text-blue-primary" />
          </button>
          
          {/* Botão de alternância para mobile */}
          {showMobileToggle && onViewChange && (
            <div className="mobile-toggle flex items-center space-x-2">
              <button
                onClick={() => onViewChange('chat')}
                className={`p-2 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none ${
                  activeView === 'chat' 
                    ? 'bg-blue-primary text-white' 
                    : 'bg-blue-light hover:bg-blue-hover text-blue-primary'
                }`}
                aria-label="Chat"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => onViewChange('content')}
                className={`p-2 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none ${
                  activeView === 'content' 
                    ? 'bg-blue-primary text-white' 
                    : 'bg-blue-light hover:bg-blue-hover text-blue-primary'
                }`}
                aria-label="Conteúdo"
              >
                <FileText className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
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
        
        .bg-blue-primary {
          background-color: #5DADE2;
        }
        
        /* Esconder o botão de alternância no desktop */
        .mobile-toggle {
          display: none;
        }
        
        /* Mostrar apenas no mobile */
        @media (max-width: 768px) {
          .mobile-toggle {
            display: flex;
          }
        }
      `}</style>
    </nav>
  );
}