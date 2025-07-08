import React, { useState, useCallback } from 'react';
import { Paperclip, ArrowUp, Loader2 } from 'lucide-react';

export default function NextNameApp() {
  const [inputValue, setInputValue] = useState('');
  const [isHovered, setIsHovered] = useState<string | false>(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(() => {
    if (inputValue.trim() && !isLoading) {
      setIsLoading(true);
      
      // Simulando análise de disponibilidade
      setTimeout(() => {
        console.log('Analisando disponibilidade para:', inputValue);
        setIsLoading(false);
      }, 2000);
    }
  }, [inputValue, isLoading]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit]);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Background with gradient */}
      <div 
        className="absolute inset-0" 
        style={{
          background: 'linear-gradient(to bottom right, #2F3338, #131313)'
        }}
      >
        {/* Radial overlay for depth */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'radial-gradient(circle at center, transparent 20%, #131313 80%)'
          }}
        />
      </div>
      
      {/* Central blue glow with animated SVG */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-96 h-96"
          style={{
            top: '50%',
            left: '50%',
            marginTop: '-192px',
            marginLeft: '-192px',
            animation: 'smoothFloat 8s ease-in-out infinite'
          }}
        >
          <svg 
            className="w-full h-full"
            viewBox="0 0 400 400"
          >
            <defs>
              <radialGradient id="blueGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#5DADE2" stopOpacity="0.4"/>
                <stop offset="30%" stopColor="#5DADE2" stopOpacity="0.2"/>
                <stop offset="70%" stopColor="#5DADE2" stopOpacity="0.1"/>
                <stop offset="100%" stopColor="#5DADE2" stopOpacity="0"/>
              </radialGradient>
            </defs>
            <circle cx="200" cy="200" r="200" fill="url(#blueGlow)" />
          </svg>
        </div>
        
        {/* Additional floating orb for more dynamic movement */}
        <div
          className="absolute w-64 h-64"
          style={{
            top: '33%',
            left: '33%',
            marginTop: '-128px',
            marginLeft: '-128px',
            animation: 'smoothFloat2 10s ease-in-out infinite'
          }}
        >
          <svg 
            className="w-full h-full"
            viewBox="0 0 300 300"
          >
            <defs>
              <radialGradient id="blueGlow2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#5DADE2" stopOpacity="0.2"/>
                <stop offset="50%" stopColor="#5DADE2" stopOpacity="0.1"/>
                <stop offset="100%" stopColor="#5DADE2" stopOpacity="0"/>
              </radialGradient>
            </defs>
            <circle cx="150" cy="150" r="150" fill="url(#blueGlow2)" />
          </svg>
        </div>
        
        {/* Granulated overlay to soften the blue */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(93, 173, 226, 0.1) 0%, transparent 70%)`
          }}
        ></div>
        
        {/* Noise/grain texture overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        ></div>
      </div>
      
      {/* Content Area */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-2xl mx-auto text-center">
          {/* Main heading */}
          <h1 
            className="text-5xl md:text-6xl font-bold mb-6 tracking-tight transition-all duration-300"
            style={{ color: '#F8FAFC' }}
          >
            O PRÓXIMO NOME DA SUA MARCA ESTÁ AQUI
          </h1>
          
          {/* Subtitle */}
          <p 
            className="text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed transition-opacity duration-300"
            style={{ color: 'rgba(248, 250, 252, 0.85)' }}
          >
            Crie o próximo nome da sua marca com IA e obtenha análise profunda de disponibilidade dos domínios, propriedade da marca e nomes nas redes sociais
          </p>
          
          {/* Input field container */}
          <div 
            className="relative rounded-2xl transition-all duration-300 p-4 border-2"
            style={{
              backgroundColor: 'rgba(47, 51, 56, 0.6)',
              backdropFilter: 'blur(10px)',
              borderColor: isFocused ? '#5DADE2' : 'rgba(248, 250, 252, 0.15)',
              boxShadow: isFocused 
                ? '0 8px 32px rgba(93, 173, 226, 0.25), 0 0 20px rgba(93, 173, 226, 0.2)' 
                : '0 2px 8px rgba(0, 0, 0, 0.3)',
              transform: isFocused ? 'scale(1.02) translateY(-2px)' : 'scale(1) translateY(0)'
            }}
          >
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyPress={handleKeyPress}
              placeholder="Digite o nome da sua marca para analisar disponibilidade..."
              className="w-full bg-transparent text-lg resize-none h-24 outline-none transition-all duration-200 custom-textarea"
              style={{
                color: '#F8FAFC',
                caretColor: '#5DADE2'
              }}
              disabled={isLoading}
              aria-label="Digite o nome da marca para análise de disponibilidade"
            />
            
            {/* Bottom buttons */}
            <div className="flex justify-between items-center mt-4">
              {/* Paperclip button */}
              <button 
                className="p-3 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{
                  backgroundColor: 'rgba(93, 173, 226, 0.2)',
                  color: '#F8FAFC',
                  focusRingColor: '#5DADE2'
                }}
                onMouseEnter={() => setIsHovered('attach')}
                onMouseLeave={() => setIsHovered(false)}
                disabled={isLoading}
                aria-label="Anexar arquivo"
              >
                <Paperclip 
                  className="w-5 h-5 transition-transform duration-200"
                  style={{
                    transform: isHovered === 'attach' ? 'rotate(12deg)' : 'rotate(0deg)'
                  }}
                />
              </button>
              
              {/* Send button */}
              <button 
                className="p-3 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{
                  backgroundColor: inputValue.trim() && !isLoading ? '#5DADE2' : '#3A7BA8',
                  color: 'white',
                  opacity: inputValue.trim() && !isLoading ? 1 : 0.5,
                  cursor: inputValue.trim() && !isLoading ? 'pointer' : 'not-allowed',
                  transform: isHovered === 'send' && inputValue.trim() && !isLoading ? 'scale(1.1)' : 'scale(1)',
                  boxShadow: inputValue.trim() && !isLoading 
                    ? '0 0 30px rgba(93, 173, 226, 0.4)' 
                    : 'none',
                  focusRingColor: '#5DADE2'
                }}
                onClick={handleSubmit}
                disabled={!inputValue.trim() || isLoading}
                onMouseEnter={() => setIsHovered('send')}
                onMouseLeave={() => setIsHovered(false)}
                aria-label="Analisar disponibilidade da marca"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <ArrowUp 
                    className="w-5 h-5 transition-transform duration-200"
                    style={{
                      transform: isHovered === 'send' && inputValue.trim() && !isLoading ? 'translateY(-4px)' : 'translateY(0)'
                    }}
                  />
                )}
              </button>
            </div>
          </div>
          
          {/* Hint text */}
          <p 
            className="text-sm mt-4 transition-opacity duration-300"
            style={{ color: 'rgba(248, 250, 252, 0.45)' }}
          >
            {isLoading 
              ? 'Analisando disponibilidade da marca em todas as plataformas...' 
              : 'Pressione Enter para analisar • Shift + Enter para nova linha'
            }
          </p>


        </div>
      </div>
      
      <style jsx>{`
        .placeholder\\:text-gray-400::placeholder {
          color: rgba(248, 250, 252, 0.65) !important;
        }
        
        /* Personalização da seleção de texto */
        .custom-textarea::selection {
          background-color: rgba(93, 173, 226, 0.4);
          color: #F8FAFC;
        }
        
        .custom-textarea::-moz-selection {
          background-color: rgba(93, 173, 226, 0.4);
          color: #F8FAFC;
        }
        
        /* Tentativa de personalizar handles (limitado) */
        .custom-textarea::-webkit-selection-handle {
          background-color: #5DADE2;
        }
        
        /* Alternativa: desabilitar seleção se necessário */
        .no-select {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        
        /* Remover as "orelhinhas" do redimensionamento */
        .custom-textarea::-webkit-resizer {
          display: none;
        }
        
        /* Personalizar a scrollbar se necessário */
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
        
        @media (max-width: 768px) {
          .text-5xl {
            font-size: 2.5rem;
          }
        }
        
        @keyframes smoothFloat {
          0% { 
            transform: translate(0px, 0px); 
          }
          25% { 
            transform: translate(15px, -10px); 
          }
          50% { 
            transform: translate(0px, -20px); 
          }
          75% { 
            transform: translate(-15px, -10px); 
          }
          100% { 
            transform: translate(0px, 0px); 
          }
        }
        
        @keyframes smoothFloat2 {
          0% { 
            transform: translate(0px, 0px); 
          }
          25% { 
            transform: translate(-10px, 15px); 
          }
          50% { 
            transform: translate(20px, 10px); 
          }
          75% { 
            transform: translate(5px, -15px); 
          }
          100% { 
            transform: translate(0px, 0px); 
          }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
