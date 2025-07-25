import React, { useState, useRef, useEffect } from 'react';
import ChatHeader from '../../ui/chat_ui/ChatHeader_ui/ChatHeader';
import ChatHistory from '../../ui/chat_ui/ChatHistory_ui/ChatHistory';
import ChatInput from '../../ui/chat_ui/ChatInput_ui/ChatInput';

// Tipos para os dados dos componentes de análise
interface DomainData {
  brandName: string;
  [key: string]: any;
}

interface TrademarkData {
  brandName: string;
  [key: string]: any;
}

interface UsernameData {
  brandName: string;
  [key: string]: any;
}

interface SummaryData {
  brandName: string;
  [key: string]: any;
}

interface AnalysisData {
  domainData?: DomainData;
  trademarkData?: TrademarkData;
  usernameData?: UsernameData;
  summaryData?: SummaryData;
}

interface AnalysisComponentsConfig {
  showDomainChecker?: boolean;
  showTrademarkChecker?: boolean;
  showUsernameChecker?: boolean;
  showAnalysisSummary?: boolean;
  analysisData?: AnalysisData;
}

interface Message {
  text: string;
  sender: 'user' | 'ai';
  showDomainChecker?: boolean;
  showTrademarkChecker?: boolean;
  showUsernameChecker?: boolean;
  showAnalysisSummary?: boolean;
  domainData?: DomainData;
  trademarkData?: TrademarkData;
  usernameData?: UsernameData;
  summaryData?: SummaryData;
}

const MainChat: React.FC = () => {
  const [brandName, setBrandName] = useState<string>('TechFlow');
  const [currentStep, setCurrentStep] = useState<string>('Analyzing trademark availability');
  const [messages, setMessages] = useState<Message[]>([]);
  const [showAnalysisComponents, setShowAnalysisComponents] = useState<AnalysisComponentsConfig>({
    showDomainChecker: false,
    showTrademarkChecker: false,
    showUsernameChecker: false,
    showAnalysisSummary: false,
    analysisData: {}
  });

  const chatScrollRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (message: string): void => {
    console.log('Mensagem enviada:', message);
    
    // Adicionar mensagem do usuário ao histórico
    setMessages(prev => [...prev, { text: message, sender: 'user' }]);
    
    // Atualizar o nome da marca baseado na mensagem
    setBrandName(message);
    
    // Simular diferentes tipos de resposta baseado no conteúdo da mensagem
    const lowerMessage = message.toLowerCase();
    
    setTimeout(() => {
      let aiResponse: Message;
      
      if (lowerMessage.includes('domínio') || lowerMessage.includes('domain')) {
        // Resposta com verificação de domínio
        aiResponse = {
          text: `Perfeito! Vou verificar a disponibilidade do domínio para "${message}". Iniciando análise:`,
          sender: 'ai',
          showDomainChecker: true,
          domainData: {
            brandName: message,
            autoStart: true,
            isActive: true,
            onStatusChange: (status: string) => {
              setCurrentStep(`Domain status: ${status}`);
            }
          }
        };
      } else if (lowerMessage.includes('marca') || lowerMessage.includes('trademark')) {
        // Resposta com verificação de marca registrada
        aiResponse = {
          text: `Vou analisar se "${message}" tem conflitos com marcas registradas. Verificando nos principais órgãos:`,
          sender: 'ai',
          showTrademarkChecker: true,
          trademarkData: {
            brandName: message,
            autoStart: true,
            isActive: true,
            onStatusChange: (status: string) => {
              setCurrentStep(`Trademark status: ${status}`);
            }
          }
        };
      } else if (lowerMessage.includes('social') || lowerMessage.includes('username') || lowerMessage.includes('redes')) {
        // Resposta com verificação de redes sociais
        aiResponse = {
          text: `Verificando disponibilidade do username "${message}" nas principais redes sociais:`,
          sender: 'ai',
          showUsernameChecker: true,
          usernameData: {
            brandName: message,
            autoStart: true,
            isActive: true,
            onStatusChange: (status: string) => {
              setCurrentStep(`Social media status: ${status}`);
            }
          }
        };
      } else if (lowerMessage.includes('completa') || lowerMessage.includes('análise') || lowerMessage.includes('tudo')) {
        // Resposta com análise completa (todos os componentes)
        aiResponse = {
          text: `Excelente! Vou fazer uma análise completa de "${message}". Isso inclui verificação de domínios, marcas registradas e redes sociais:`,
          sender: 'ai',
          showDomainChecker: true,
          showTrademarkChecker: true,
          showUsernameChecker: true,
          showAnalysisSummary: true,
          domainData: {
            brandName: message,
            autoStart: true,
            isActive: true
          },
          trademarkData: {
            brandName: message,
            autoStart: true,
            isActive: true
          },
          usernameData: {
            brandName: message,
            autoStart: true,
            isActive: true
          },
          summaryData: {
            brandName: message,
            isVisible: true
          }
        };
      } else {
        // Resposta padrão com sugestões
        aiResponse = {
          text: `Olá! Para analisar "${message}", posso verificar:
          
• **Domínios** - Digite "verificar domínio ${message}"
• **Marcas Registradas** - Digite "verificar marca ${message}"  
• **Redes Sociais** - Digite "verificar redes sociais ${message}"
• **Análise Completa** - Digite "análise completa ${message}"

Qual tipo de verificação você gostaria de fazer primeiro?`,
          sender: 'ai'
        };
      }
      
      setMessages(prev => [...prev, aiResponse]);
      setCurrentStep('Aguardando próxima solicitação');
    }, 1000);
  };

  // Verificar se há mensagem inicial do sessionStorage
  useEffect(() => {
    const initialMessage = sessionStorage.getItem('initialMessage');
    if (initialMessage) {
      // Limpar o sessionStorage
      sessionStorage.removeItem('initialMessage');
      // Enviar a mensagem automaticamente
      handleSendMessage(initialMessage);
    }
  }, []);

  // Auto-scroll quando mensagens são adicionadas
  useEffect(() => {
    if (chatScrollRef.current) {
      const timer = setTimeout(() => {
        chatScrollRef.current?.scrollTo({
          top: chatScrollRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  // Função para mostrar componentes de análise globalmente (opcional)
  const showAnalysisResults = (analysisType: string, data: any): void => {
    setShowAnalysisComponents(prev => ({
      ...prev,
      [`show${analysisType}`]: true,
      analysisData: {
        ...prev.analysisData,
        [`${analysisType.toLowerCase()}Data`]: data
      }
    }));
  };

  return (
    <>
      <div className="w-full h-full flex flex-col custom-selection chat-container" style={{ backgroundColor: '#2F3338' }}>
        
        {/* Header */}
        <div className="flex-shrink-0 chat-header">
          <ChatHeader 
            brandName={brandName} 
            currentStep={currentStep} 
          />
        </div>

        {/* History - Container com scroll */}
        <div 
          ref={chatScrollRef}
          className="flex-1 overflow-y-auto"
        >
          <ChatHistory 
            messages={messages} 
            showAnalysisComponents={showAnalysisComponents}
          />
        </div>

        {/* Input */}
        <div className="flex-shrink-0 chat-input">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>

      </div>

      <style jsx>{`
        /* Container principal com altura fixa consistente */
        .chat-container {
          height: 100%;
          position: relative;
          overflow: hidden;
        }
        
        /* Header com proteção total no mobile */
        .chat-header {
          position: relative;
          z-index: 20;
          background-color: #2F3338;
          padding-top: env(safe-area-inset-top);
          padding-left: env(safe-area-inset-left);
          padding-right: env(safe-area-inset-right);
        }
        
        /* Input com proteção no mobile */
        .chat-input {
          position: relative;
          z-index: 20;
          background-color: #2F3338;
          padding-bottom: env(safe-area-inset-bottom);
          padding-left: env(safe-area-inset-left);
          padding-right: env(safe-area-inset-right);
        }
        
        /* Personalização da seleção de texto - Global */
        .custom-selection ::selection {
          background-color: rgba(93, 173, 226, 0.4);
          color: #F8FAFC;
        }
        
        .custom-selection ::-moz-selection {
          background-color: rgba(93, 173, 226, 0.4);
          color: #F8FAFC;
        }
        
        /* Ajustes específicos para mobile */
        @media (max-width: 768px) {
          .text-5xl {
            font-size: 2.5rem;
          }
          
          .chat-container {
            /* Força altura dinâmica no mobile */
            height: 100%;
            min-height: unset;
          }
          
          .chat-header {
            /* Header sticky no mobile */
            position: sticky;
            top: 0;
            min-height: calc(60px + env(safe-area-inset-top));
          }
          
          .chat-input {
            /* Input fixo no mobile */
            position: sticky;
            bottom: 0;
            min-height: calc(80px + env(safe-area-inset-bottom));
          }
        }
        
        /* Ajustes para modo desktop no mobile */
        @media (max-width: 768px) and (min-height: 600px) {
          .chat-container {
            /* Garante altura correta em modo desktop mobile */
            height: 100vh;
            max-height: 100vh;
          }
        }
        
        /* Suporte para diferentes tipos de viewport */
        @supports (height: 100dvh) {
          @media (max-width: 768px) {
            .chat-container {
              height: 100dvh;
              max-height: 100dvh;
            }
          }
        }
        
        /* Fallback para browsers sem suporte a env() */
        @supports not (padding: env(safe-area-inset-top)) {
          .chat-header {
            padding-top: 10px;
          }
          
          .chat-input {
            padding-bottom: 10px;
          }
        }
      `}</style>
    </>
  );
};

export default MainChat;