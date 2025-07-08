import React, { useState } from 'react';
import ChatHeader from './components/ui/chat_ui/ChatHeader_ui/ChatHeader';
import ChatHistory from './components/ui/chat_ui/ChatHistory_ui/ChatHistory';
import ChatInput from './components/ui/chat_ui/ChatInput_ui/ChatInput';

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

  const handleSendMessage = (message: string): void => {
    // Aqui você pode implementar a lógica para enviar mensagens
    console.log('Mensagem enviada:', message);
    
    // Exemplo: adicionar mensagem do usuário ao histórico
    setMessages(prev => [...prev, { text: message, sender: 'user' }]);
    
    // Exemplo: simular resposta da AI com componentes de análise
    setTimeout(() => {
      const aiResponse: Message = {
        text: `Analisando a disponibilidade do nome "${message}"...`,
        sender: 'ai',
        showDomainChecker: true,
        showTrademarkChecker: true,
        showUsernameChecker: true,
        showAnalysisSummary: true,
        domainData: {
          brandName: message,
          // dados específicos do domínio
        },
        trademarkData: {
          brandName: message,
          // dados específicos da marca
        },
        usernameData: {
          brandName: message,
          // dados específicos do username
        },
        summaryData: {
          brandName: message,
          // dados do resumo da análise
        }
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

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
      <div className="w-full min-h-screen custom-selection" style={{ backgroundColor: '#2F3338' }}>
        
        {/* Header */}
        <ChatHeader 
          brandName={brandName} 
          currentStep={currentStep} 
        />

        {/* History - Passando os componentes de análise */}
        <ChatHistory 
          messages={messages} 
          showAnalysisComponents={showAnalysisComponents}
        />

        {/* Input */}
        <ChatInput onSendMessage={handleSendMessage} />

      </div>

      <style jsx>{`
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
        }
      `}</style>
    </>
  );
};

export default MainChat;