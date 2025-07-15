import { Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-header-solid border-b border-header-border">
      <div className="max-w-full px-4 py-4">
        <div className="flex items-center">
          <button 
            className="p-2 rounded-xl bg-blue-light hover:bg-blue-hover transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
            aria-label="Menu"
          >
            <Menu className="w-5 h-5 text-blue-primary" />
          </button>
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
      `}</style>
    </nav>
  );
}