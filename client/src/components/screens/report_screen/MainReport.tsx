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
      <div className="w-full h-full flex flex-col custom-selection report-container" style={{ backgroundColor: '#2F3338' }}>
        
        {/* Header */}
        <div className="flex-shrink-0 report-header">
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
        <div className="flex-shrink-0 report-input">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>

      </div>

      <style jsx>{`
        /* Container principal com safe area */
        .report-container {
          height: 100vh;
          height: 100dvh; /* Dynamic viewport height para mobile */
          padding-top: env(safe-area-inset-top);
          padding-bottom: env(safe-area-inset-bottom);
        }
        
        /* Header com proteção adicional no mobile */
        .report-header {
          position: relative;
          z-index: 10;
        }
        
        /* Input com proteção no mobile */
        .report-input {
          position: relative;
          z-index: 10;
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
        
        @media (max-width: 768px) {
          .text-5xl {
            font-size: 2.5rem;
          }
          
          /* Ajustes específicos para mobile */
          .report-container {
            /* Adiciona um padding top extra em mobile se necessário */
            padding-top: max(env(safe-area-inset-top), 10px);
          }
          
          .report-header {
            /* Garante que o header não seja sobreposto */
            position: sticky;
            top: 0;
            background-color: #2F3338;
          }
        }
        
        /* Suporte para iOS e outros dispositivos com notch */
        @supports (padding: max(0px)) {
          .report-container {
            padding-top: max(env(safe-area-inset-top), 0px);
            padding-bottom: max(env(safe-area-inset-bottom), 0px);
            padding-left: max(env(safe-area-inset-left), 0px);
            padding-right: max(env(safe-area-inset-right), 0px);
          }
        }
      `}</style>
    </>
  );
};

export default MainChat;